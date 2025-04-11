import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import jwt from 'jsonwebtoken';
import Config from '../../Config/Config';
import UserModal from '../../Models/UserModal';
import CICDModal from '../../Models/CICDModal';

// Function to generate the workflow YAML content
function generateWorkflowYaml(config: {
  projectName: string;
  branch: string;
  buildCommand: string;
  testCommand: string;
  deployCommand: string;
}) {
  return `name: ${config.projectName} CI/CD Pipeline

on:
  push:
    branches: [ ${config.branch} ]
  pull_request:
    branches: [ ${config.branch} ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build project
        run: ${config.buildCommand}
        
      - name: Test project
        run: ${config.testCommand}
        
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.1
        with:
          publish-dir: './out'
          production-branch: ${config.branch}
          github-token: \${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: \${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: \${{ secrets.NETLIFY_SITE_ID }}`;
}

export async function POST(req: NextRequest) {
  await Config();

  // 1️⃣ Extract the token from the Authorization header
  const authHeader = req.headers.get("Authorization");
  const token = authHeader?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token missing from headers" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { name, url, branch, buildscript, testscript, deploymentscript } = body;

    // 2️⃣ Verify the token
    const decoded = jwt.verify(token, "prasanna") as { id: string };
    const user = await UserModal.findById(decoded.id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Validate request body
    if (!name || !url || !branch || !buildscript || !testscript || !deploymentscript) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 4️⃣ Save the CICD pipeline configuration to MongoDB
    const newCICD = new CICDModal({
      name,
      url,
      branch,
      buildscript,
      testscript,
      deploymentscript,
    });
    await newCICD.save();
    user.Cicds.push(newCICD._id);
    await user.save();

    // 5️⃣ Extract repository owner and name from the URL
    const githubUrlRegex = /^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(githubUrlRegex);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Invalid GitHub repository URL" },
        { status: 400 }
      );
    }
    const [, owner, repo] = match;

    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { success: false, message: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    // 6️⃣ Check repository access
    try {
      await octokit.rest.repos.get({ owner, repo });
    } catch (error: any) {
      if (error.status === 404) {
        return NextResponse.json(
          { success: false, message: "Repository not found or no access" },
          { status: 404 }
        );
      }
      throw error;
    }

    // 7️⃣ Check branch existence
    try {
      await octokit.rest.repos.getBranch({ owner, repo, branch });
    } catch (error: any) {
      return NextResponse.json(
        { success: false, message: "Branch not found" },
        { status: 404 }
      );
    }

    // 8️⃣ Generate GitHub Actions workflow file
    const workflowContent = generateWorkflowYaml({
      projectName: name,
      branch,
      buildCommand: buildscript,
      testCommand: testscript,
      deployCommand: deploymentscript,
    });

    const contentBase64 = Buffer.from(workflowContent).toString("base64");
    const workflowPath = ".github/workflows/ci.yml";

    let existingFile;
    try {
      const response = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: workflowPath,
        ref: branch,
      });

      if (Array.isArray(response.data)) {
        throw new Error("Path is a directory, not a file");
      }

      existingFile = response.data;
    } catch (error: any) {
      if (error.status !== 404) {
        console.error("Error checking existing file:", error);
      }
    }

    // 9️⃣ Create or update the workflow file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: workflowPath,
      message: existingFile ? "Update CI/CD workflow" : "Create CI/CD workflow",
      content: contentBase64,
      sha: existingFile?.sha,
      branch,
    });

    // ✅ SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      message: "Pipeline configured successfully! GitHub Actions workflow created.",
      data: {
        projectName: name,
        branch,
        workflowUrl: `${url}/actions`,
      },
      cicd: newCICD,
    });
  } catch (error: any) {
    console.error("Pipeline configuration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to configure pipeline",
      },
      { status: 500 }
    );
  }
}

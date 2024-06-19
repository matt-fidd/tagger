import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = core.getInput('github-token');
    const context = github.context;
    const { rest } = github.getOctokit(token);

    const { owner, repo } = context.repo;

    if (!context.payload.pull_request) {
      core.setFailed('context is not pull request');
    }

    const { data: pullRequest } = await rest.pulls.get({
      owner,
      repo,
      pull_number: context.payload?.pull_request?.number ?? 0,
    });

    console.log(pullRequest);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

run();
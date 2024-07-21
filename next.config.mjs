const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';
const repoName = 'Demo'; // Replace with your repository name

export default {
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',
  images: {
    unoptimized: true, // Necessary for GitHub Pages
  },
  publicRuntimeConfig: {
    basePath: isGitHubPages ? `/${repoName}` : '',
  },
  env: {
    GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  }
};

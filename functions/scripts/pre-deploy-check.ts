import { execSync } from 'child_process';

async function runPreDeployChecks() {
  try {
    // Run type checking
    execSync('npm run type-check', { stdio: 'inherit' });
    
    // Run linting
    execSync('npm run lint', { stdio: 'inherit' });
    
    // Run build
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Pre-deploy checks passed');
  } catch (error) {
    console.error('❌ Pre-deploy checks failed');
    process.exit(1);
  }
}

runPreDeployChecks(); 
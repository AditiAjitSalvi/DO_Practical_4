pipeline {
    agent any 

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning GitHub repository...'
                git branch: 'main', url: 'https://github.com/AditiAjitSalvi/DO_Practical_4.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('Build (Optional)') {
            steps {
                echo 'Running build step (if needed)...'
                // Uncomment if your project has a build step
                // sh 'npm run build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Deploying Node.js app...'

                // Kill any running node process
                sh 'pkill node || true'

                // Start app in background and redirect output
                sh 'nohup node app.js > output.log 2>&1 &'

                // Optional: Use PM2 for better process management
                // sh 'npm install -g pm2'
                // sh 'pm2 stop my-app || true'
                // sh 'pm2 start app.js --name my-app'
            }
        }

        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                // Adjust the port or endpoint as per your app
                sh 'curl --fail http://localhost:3000 || (echo "App failed health check." && exit 1)'
            }
        }
    }

    post {
        success {
            echo '✅ App deployed successfully!'
            archiveArtifacts artifacts: 'output.log', onlyIfSuccessful: true
        }
        failure {
            echo '❌ Deployment failed.'
        }
        always {
            echo '📦 Archiving deployment logs...'
            archiveArtifacts artifacts: 'output.log', allowEmptyArchive: true
        }
    }
}

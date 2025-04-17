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
                script {
                    if (isUnix()) {
                        echo 'Installing npm packages on Linux...'
                        sh 'npm install'
                    } else {
                        echo 'Installing npm packages on Windows...'
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Build (Optional)') {
            steps {
                script {
                    if (isUnix()) {
                        echo 'Running build step (Linux)...'
                        // Uncomment if you have a build step
                        // sh 'npm run build'
                    } else {
                        echo 'Running build step (Windows)...'
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                script {
                    if (isUnix()) {
                        echo 'Deploying Node.js app on Linux...'

                        // Kill running app
                        sh 'pkill node || true'

                        // Start app
                        sh 'nohup node app.js > output.log 2>&1 &'
                        
                        // PM2 alternative (commented)
                        // sh 'npm install -g pm2'
                        // sh 'pm2 stop my-app || true'
                        // sh 'pm2 start app.js --name my-app'

                    } else {
                        echo 'Deploying Node.js app on Windows...'
                        bat 'npm run deploy'
                    }
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    if (isUnix()) {
                        echo 'Performing health check on Linux...'
                        sh 'curl --fail http://localhost:3000 || (echo "App failed health check." && exit 1)'
                    } else {
                        echo 'Performing health check on Windows...'
                        bat 'curl http://localhost:3000 || exit /b 1'
                    }
                }
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
            archiveArtifacts artifacts: '**/logs/**', allowEmptyArchive: true
        }
    }
}

pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    options {
        // Automatically discard old builds
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo '🧹 Cleaning workspace...'
                deleteDir()
            }
        }

        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/AditiAjitSalvi/DO_Practical_4.git'
            }
        }

        stage('Show Node.js Version') {
            steps {
                echo '📦 Checking Node.js and npm versions...'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Build (Optional)') {
            steps {
                echo '🛠 Running build step (if defined)...'
                sh '''
                    if npm run | grep -q " build"; then
                        npm run build
                    else
                        echo "No build script defined. Skipping build..."
                    fi
                '''
            }
        }

        stage('Run App') {
            steps {
                echo '🚀 Starting Node.js app...'
                // Stop previous instance
                sh 'pkill node || true'
                // Start app in background
                sh 'nohup node index.js > output.log 2>&1 &'
                // Alternative with PM2 (commented out by default)
                // sh 'npm install -g pm2'
                // sh 'pm2 stop app || true'
                // sh 'pm2 start index.js --name app'
            }
        }

        stage('Health Check') {
            steps {
                echo '✅ Checking if app is running...'
                sh 'curl --fail http://localhost:3000 || (echo "❌ App failed health check" && exit 1)'
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful!'
            archiveArtifacts artifacts: 'output.log', onlyIfSuccessful: true
        }
        failure {
            echo '🚨 Deployment failed!'
        }
        always {
            echo '🗃 Archiving logs...'
            archiveArtifacts artifacts: 'output.log', allowEmptyArchive: true
        }
    }
}

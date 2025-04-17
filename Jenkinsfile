pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/AditiAjitSalvi/DO_Practical_4.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Run App') {
            steps {
                echo '🚀 Starting Node.js app...'
                // Check if node is running
                bat 'tasklist /FI "IMAGENAME eq node.exe" | find ":" || echo No node process found'
                // Start app in background
                bat '''
                if not exist "node.exe" (
                    echo "Starting Node.js app..."
                    start /B node index.js > output.log 2>&1
                ) else (
                    echo "Node.js app is already running"
                )
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo '✅ Checking if app is running...'
                bat 'curl --fail http://localhost:3000 || (echo "❌ App failed health check" && exit 1)'
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

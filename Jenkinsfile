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
                sh 'npm install'
            }
        }

        stage('Run App') {
            steps {
                echo '🚀 Starting Node.js app...'
                // Stop any previous instance
                sh 'pkill node || true'
                // Start app in background
                sh 'nohup node index.js > output.log 2>&1 &'
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

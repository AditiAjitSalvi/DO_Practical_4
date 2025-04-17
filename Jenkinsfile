pipeline {
    agent any

    environment {
        // Optional: Define Node environment path if needed
        NODE_ENV = 'production'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/YourUsername/YourRepoName.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm install'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Starting Node.js App...'
                // Kill previous instance if running and start fresh
                sh 'pkill node || true'
                sh 'nohup node app.js > output.log 2>&1 &'
            }
        }
    }

    post {
        success {
            echo 'App deployed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}

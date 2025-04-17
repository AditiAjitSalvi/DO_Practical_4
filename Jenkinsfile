pipeline {
    agent any
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                bat 'npm install'
            }
        }
        stage('Build (Optional)') {
            steps {
                echo 'Running build...'
                bat 'npm run build'
            }
        }
        stage('Deploy Application') {
            steps {
                echo 'Deploying...'
                bat 'npm run deploy'
            }
        }
    }
    post {
        always {
            echo '📦 Archiving deployment logs...'
            archiveArtifacts artifacts: '**/logs/**', allowEmptyArchive: true
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}

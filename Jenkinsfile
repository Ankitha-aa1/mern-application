def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger'
]

pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner' // Name must match Jenkins tool config
    }

    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/Ankitha-aa1/mern-application.git'
            }
        }

        stage('SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv(installationName: 'sonar-server', credentialsId: 'sonar-cred') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=mern_application \
                        -Dsonar.projectName=mern-app'''
                }
            }
        }

        stage('Docker Compose Up') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Docker Push to DockerHub') {
            steps {
                withDockerRegistry(credentialsId: 'docker-cred') {
                    sh '''
                        docker tag mern-application-frontend your-dockerhub-username/mern-application-frontend
                        docker tag mern-application-backend your-dockerhub-username/mern-application-backend
                        docker push your-dockerhub-username/mern-application-frontend
                        docker push your-dockerhub-username/mern-application-backend
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Sending Slack Notification...'
            slackSend channel: '#jenkinsapp',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}*: Job *${env.JOB_NAME}* Build #${env.BUILD_NUMBER}\nDetails: ${env.BUILD_URL}"
        }
    }
}

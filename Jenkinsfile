def COLOR_MAP = [
    'SUCCESS': 'good',
    'FAILURE': 'danger'
]

pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner' 
    }

    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/Ankitha-aa1/mern-application.git'
            }
        }

        stage('SonarQube Code Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh ''' 
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectKey=mern_application \
                        -Dsonar.projectName=mern-app \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=<SONAR_TOKEN> 
                    '''
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
                withDockerRegistry(url: 'https://index.docker.io/v1/', credentialsId: 'docker-cred') {
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
            slackSend(
                channel: '#jenkinsapp',
                color: COLOR_MAP[currentBuild.currentResult],
                message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build #${env.BUILD_NUMBER}\nMore info: ${env.BUILD_URL}"
            )
        }
    }
}


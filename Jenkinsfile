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
        stage('git checkout') {
            steps {
                git 'https://github.com/Ankitha-aa1/mern-application.git'
            }
        }
        stage ('sonar code analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
               sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=mern-app \
               -Dsonar.projectKey=mern_application'''
                }
            }
        }
        stage('Docker Compose') {
            steps {
                script{
                    sh 'docker-compose up -d'
                }
            }
        }
        stage('docker push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker-cred') {
                       sh 'docker tag mern-app-frontend sushmaagowdaa/mern-app-frontend'
                       sh 'docker tag mern-app-backend sushmaagowdaa/mern-app-backend'
                       sh 'docker push sushmaagowdaa/mern-app-frontend'
                       sh 'docker push sushmaagowdaa/mern-app-backend' 
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'slack Notification.'
            slackSend channel: '#jenkins-team',
            color: COLOR_MAP [currentBuild.currentResult],
            message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URl}"
            
        }
    }
}

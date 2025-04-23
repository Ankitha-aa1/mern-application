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

        stage('Code Analysis') {
            steps {
                withSonarQubeEnv('sonar-server') {
                    sh """
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=mern-application \
                        -Dsonar.projectName=mern-application \
                        -Dsonar.java.binaries=.
                    """
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                   sh 'docker-compose up -d'
                }
            }
        }
    }
}

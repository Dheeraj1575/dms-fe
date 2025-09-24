// Jenkinsfile (Declarative) — works on Windows or Linux agents
pipeline {
  agent any

  environment {
    PROJECT = "new-project2"   // optional name
    IMAGE   = "frontend:latest"
    CONTAINER = "frontend-container"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            bat 'npm ci'
          }
        }
      }
    }

    stage('Build') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm run build'
          } else {
            bat 'npm run build'
          }
        }
      }
    }

    stage('Archive build') {
      steps {
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Docker build') {
      when {
        expression { return fileExists('Dockerfile.frontend') }
      }
      steps {
        script {
          if (isUnix()) {
            sh "docker build -f Dockerfile.frontend -t ${IMAGE} ."
          } else {
            bat "docker build -f Dockerfile.frontend -t ${IMAGE} ."
          }
        }
      }
    }

    stage('Run container') {
      when {
        expression { return fileExists('Dockerfile.frontend') }
      }
      steps {
        script {
          if (isUnix()) {
            sh """
              docker stop ${CONTAINER} || true
              docker rm ${CONTAINER} || true
              docker run -d -p 8080:8080 --name ${CONTAINER} ${IMAGE}
            """
          } else {
            bat """
              docker stop ${CONTAINER} || exit 0
              docker rm ${CONTAINER} || exit 0
              docker run -d -p 8080:8080 --name ${CONTAINER} ${IMAGE}
            """
          }
        }
      }
    }
  }

  post {
    success {
      echo "✅ Build and deployment finished successfully"
      echo "👉 Open the app at: http://localhost:8080 (or http://<server-ip>:8080 if remote)"
    }
    failure {
      echo "❌ Build failed — check console output"
    }
  }
}

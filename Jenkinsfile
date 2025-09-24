// Jenkinsfile (Declarative) — works on Windows or Linux agents
pipeline {
  agent any

  // Optional: if you configured NodeJS in Manage Jenkins -> Global Tool Configuration
  // tools { nodejs 'NodeJS_18' }

  environment {
    PROJECT = "new-project2"   // optional name
  }

  stages {
    stage('Checkout') {
      steps {
        // if Jenkins job is configured to fetch from SCM this does nothing extra
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            // on Windows node
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
        // archives the generated dist so you can download from Jenkins
        archiveArtifacts artifacts: 'dist/**', fingerprint: true
      }
    }

    stage('Docker build (optional)') {
      when {
        expression { return fileExists('Dockerfile.frontend') }
      }
      steps {
        script {
          if (isUnix()) {
            sh 'docker build -f Dockerfile.frontend -t frontend:latest .'
          } else {
            bat 'docker build -f Dockerfile.frontend -t frontend:latest .'
          }
        }
      }
    }
  }

  post {
    success { echo "Build finished successfully" }
    failure { echo "Build failed — check console output" }
  }
}

pipeline {
  agent any
  tools {
    nodejs 'nodejs'
    jdk 'jdk17'
  }
  environment {
    VERCEL_TOKEN = credentials('vercel-token')
    SONAR_TOKEN = credentials('sonarqube-credential')
    SCANNER_HOME = tool 'sonar_scanner'

  }
  stages {
    stage('Verify Java Version') {
      steps {
        sh 'java -version'
      }
    }
    stage('Checkout') {
      steps {
        git url: 'https://github.com/frosthaern/frs-bs.git', branch: 'main', credentialsId: 'github-secret-token'
      }
    }
    
  stage('SonarQube Analysis') {
    steps {
      withSonarQubeEnv('sonarqube_server') {
       sh '''
        export JAVA_HOME="${JAVA_HOME}"
        export PATH="$JAVA_HOME/bin:$PATH"
        java -version
        ${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=frs-bs
      '''
      }
    }
  }
    
    stage('Quality Gate') {
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
    
    stage('Vercel Deployment') {
      steps {
        sh '''
          npm install --save-dev vercel
          npx vercel pull --yes --environment=production --token=$VERCEL_TOKEN
          npx vercel build --prod --token=$VERCEL_TOKEN
          npx vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
        '''
      }
    }
  }
}

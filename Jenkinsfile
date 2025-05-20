pipeline {
  agent any
  tools {
    nodejs 'nodejs'
  }
  environment {
    VERCEL_TOKEN = credentials('vercel-token')
    SONAR_TOKEN = credentials('sonarqube-credential')
    SCANNER_HOME = tool 'sonarqube_scanner'

  }
  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/frosthaern/frs-bs.git', branch: 'main', credentialsId: 'github-secret-token'
      }
    }
    
  stage('SonarQube Analysis') {
    steps {
      withSonarQubeEnv('sonarqube_server') {
        sh '${SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=frs-bs'
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

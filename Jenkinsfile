pipeline {
  agent any

  tools {
    nodejs 'nodejs'
    jdk 'jdk17'
    // Ensure 'sonar_scanner' is configured in Jenkins Global Tool Configuration
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

    stage('Network Test') {
      steps {
        sh '''
          echo "Container IP:"
          hostname -i

          echo "Testing connection to SonarQube by name:"
          ping -c 2 sonarqube || echo "Cannot ping SonarQube by name"

          echo "Testing connection to SonarQube by IP:"
          ping -c 2 172.18.0.2 || echo "Cannot ping SonarQube by IP"

          echo "Testing SonarQube API by hostname:"
          curl -I http://sonarqube:9000/api/system/status || echo "Cannot connect to SonarQube API by hostname"

          echo "Testing SonarQube API by IP:"
          curl -I http://172.18.0.2:9000/api/system/status || echo "Cannot connect to SonarQube API by IP"
        '''
      }
    }
  stage('Install Dependencies') {
      steps {
        sh 'npm i'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        script {
          // Create sonar-project.properties if not already in repo
          writeFile file: 'sonar-project.properties', text: '''
sonar.projectKey=frs-bs
sonar.projectName=frs-bs
sonar.sources=.
sonar.sourceEncoding=UTF-8
          '''.stripIndent()

          withSonarQubeEnv('sonarqube_server') {
        sh '''
          npx sonar \
            -Dsonar.projectKey=frs-bs \
            -Dsonar.projectName=frs-bs \
            -Dsonar.sources=. \
            -Dsonar.host.url=http://sonarqube:9000 \
            -Dsonar.token=$SONAR_TOKEN \
            -Dsonar.sourceEncoding=UTF-8
        '''
          }
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
        script {
          // Install Vercel CLI
          sh 'npm install --save-dev vercel@latest'
          
          // Deploy directly without trying to link first
          sh '''
            # Set deployment URL as an environment variable for later use
            DEPLOYMENT_URL=$(npx vercel --prod --token=$VERCEL_TOKEN --confirm 2>&1 | grep 'Preview:' | awk '{print $2}' || true)
            
            if [ -z "$DEPLOYMENT_URL" ]; then
              echo "Failed to get deployment URL"
              exit 1
            fi
            
            echo "Deployment URL: $DEPLOYMENT_URL"
          '''
        }
      }
    }
  }

  post {
    failure {
      echo 'Pipeline failed. Please check the stage logs above for details.'
    }
    success {
      echo 'Pipeline completed successfully!'
    }
  }
}

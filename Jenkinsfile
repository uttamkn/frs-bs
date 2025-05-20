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
    
      stage('Network Test') {
      steps {
        sh '''
          # Show container networking information
          hostname -i

          # Test connectivity to SonarQube container
          echo "Testing connection to SonarQube"
          ping -c 2 sonarqube || echo "Cannot ping SonarQube container by name"
          ping -c 2 172.18.0.2 || echo "Cannot ping SonarQube by IP"

          # Try to reach SonarQube API
          curl -I http://sonarqube:9000/api/system/status || echo "Cannot connect to SonarQube API by hostname"
          curl -I http://172.18.0.2:9000/api/system/status || echo "Cannot connect to SonarQube API by IP"
        '''
      }
    }

    stage('SonarQube Analysis') {
      steps {
        // Create a sonar-project.properties file with the correct parameters
        sh '''
          cat > sonar-project.properties << EOF
sonar.projectKey=frs-bs
sonar.projectName=frs-bs
sonar.sources=.
sonar.sourceEncoding=UTF-8
EOF
        '''

        withSonarQubeEnv('sonarqube_server') {
          sh '''
            # Set explicit Java options for SonarQube scanner
            export SONAR_SCANNER_OPTS="-Djava.home=${JAVA_HOME}"

            # Run SonarQube scanner with explicit URL by hostname
            echo "Trying SonarQube scanner with hostname..."
            ${SCANNER_HOME}/bin/sonar-scanner \\
              -Dsonar.projectKey=frs-bs \\
              -Dsonar.host.url=http://sonarqube:9000 \\
              -Dsonar.token=${SONAR_TOKEN} \\
              -X

            # If that failed, try with IP address
            echo "Trying SonarQube scanner with IP address..."
            ${SCANNER_HOME}/bin/sonar-scanner \\
              -Dsonar.projectKey=frs-bs \\
              -Dsonar.host.url=http://172.18.0.2:9000 \\
              -Dsonar.login=${SONAR_TOKEN} \\
              -X
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

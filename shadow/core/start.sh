// Copyright (c) 2025 NAME.
// All rights reserved.
// Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.

#!/bin/bash
# Shadow Core AI Engine — Linux/Mac Bootstrap
# Starts Ollama server and loads custom Shadow model

ollama serve &
sleep 2
ollama run shadow-core-1

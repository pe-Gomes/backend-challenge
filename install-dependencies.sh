#!/bin/bash

install_dependencies() {
    local directory=$1
    local package_manager=pnpm

    echo "Installing required dependencies in $directory with $package_manager"
    
    if [ -d "$directory" ]; then
        cd "$directory"

        if [ -f "package.json" ]; then
            $package_manager install
            echo "Dependencies installed in $directory."
        else
            echo "No package.json found in $directory. Skipping..."
        fi

        cd - > /dev/null
    else
        echo "Directory $directory does not exist."
    fi
}

add_env_file() {
  local directory="./packages/submissions"
  local env_content='DATABASE_URL="postgres://docker:docker@localhost:5432/rocketseat_challenge"'

  echo "Checking for .env file in $directory..."

  if [ -d "$directory" ]; then
    local env_file="$directory/.env"

    if [ -f "$env_file" ]; then
      echo "Updating existing .env file in $directory."
    else
      echo "Creating new .env file in $directory."
    fi

    # Add or overwrite the .env content
    echo "$env_content" > "$env_file"
    echo ".env file updated in $directory."
  else
    echo "Directory $directory does not exist. Skipping .env update..."
  fi
}

directories=(
    "packages/corrections"
    "packages/submissions"
)

add_env_file

for directory in "${directories[@]}"; do
    install_dependencies "$directory"
done

echo "All dependencies installed."
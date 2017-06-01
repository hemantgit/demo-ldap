#!/usr/bin/env bash

#
# Deletes all the cxp related configurations from a project. The final project will run forms only

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
EXEC_DIR=$(pwd);

if [ "$SCRIPT_DIR" != "$EXEC_DIR" ]; then
    echo "ERROR: Script must be executed in the directory in which it is located!"
    echo "execution dir = $EXEC_DIR but script dir = $SCRIPT_DIR";
    exit 1;
fi

read -p "All CXP/Launchpad modules in your project will be removed (it can only be undone if the project is under version control). Continue [y/n]?" yn
case $yn in
    [Yy]* )
        cd ../
        find . -type d -name "contentservices" -exec rm -rf {} \; 2>/dev/null
        find . -type d -name "orchestrator" -exec rm -rf {} \; 2>/dev/null
        find . -type d -name "portalserver" -exec rm -rf {} \; 2>/dev/null
        find . -type d -name "solr" -exec rm -rf {} \; 2>/dev/null
        rm -rf cxp-exports services statics styleguide;
        echo "CXP/Launchpad modules removed.";
        ;;
    * )
        echo "Cancelled."
        ;;
esac

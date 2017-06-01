#!/usr/bin/env bash

#
# Deletes all the forms related configurations from a project. The final project will run cxp modules only.

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
EXEC_DIR=$(pwd);

if [ "$SCRIPT_DIR" != "$EXEC_DIR" ]; then
    echo "ERROR: Script must be executed in the directory in which it is located!"
    echo "execution dir = $EXEC_DIR but script dir = $SCRIPT_DIR";
    exit 1;
fi

read -p "All Forms modules in your project will be removed (it can only be undone if the project is under version control). Continue? [y/n]" yn
case $yn in
    [Yy]* )
        cd ../
        find . -type d -name "forms-*" -exec rm -rf {} \; 2>/dev/null

        # delete modules from ../pom.xml
        #        <module>forms-parent</module>
        #        <module>forms-home</module>
        #        <module>forms-plugins</module>
        sed -i '' '/module>forms-/d' pom.xml

        # delete dependencies from ../pom.xml
        sed -i '' '/FORMS-DEPENDENCIES-START/,/FORMS-DEPENDENCIES-END/d' pom.xml

        # delete properties from ../pom.xml
        sed -i '' '/forms.version/d' pom.xml
        sed -i '' '/forms.home/d' pom.xml
        sed -i '' '/forms-runtime.dir/d' pom.xml

        # delete module from ../webapps/pom.xml
        #       <module>forms-runtime</module>
        sed -i '' '/module>forms-/d' webapps/pom.xml

        # delete dependencies from ../webapps/portalserver/pom.xml
        sed -i '' '/FORMS-PROXY-START/,/FORMS-PROXY-END/d' webapps/portalserver/pom.xml

        # delete property from ../configuration/pom.xml
        #       <forms.home>some-forms-home-path</forms.home>
        sed -i '' '/forms.home/d' configuration/pom.xml

        # delete plugin from ../configuration/pom.xml
        sed -i '' '/FORMS-CONTEXT-START/,/FORMS-CONTEXT-END/d' configuration/pom.xml

        # delete war from assembly
        sed -i '' '/FORMS-RUNTIME-START/,/FORMS-RUNTIME-END/d' dist/assembly/assembly.xml
        echo "Forms modules removed."
        ;;
    * )
        echo "Cancelled."
        ;;
esac

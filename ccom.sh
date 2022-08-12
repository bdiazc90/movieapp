appPath=$PWD

# args
componentName=$1;
componentAlias=$2;

[ -z $componentName ] && echo "Component Name required." && exit 1

[ -z $componentAlias ] && componentAlias=$componentName

# paths:
componentsPath=$PWD/src/components
componentFolderPath=$componentsPath/$componentName

# valid if componentsPath exists:
[ -d $componentFolderPath ] && echo "Directory ${componentFolderPath} exists." && exit 1

mkdir $componentFolderPath

componentFile=$componentFolderPath/index.js

echo "const ${componentName} = () => {" >| $componentFile
echo "return (<div></div>);" >> $componentFile
echo "};" >> $componentFile
echo "" >> $componentFile
echo "export default ${componentName};" >> $componentFile

# Add alias to components/index.js
echo "export { default as ${componentAlias} } from './${componentName}';" >> $componentsPath/index.js

echo "Component '${componentName}' created!"

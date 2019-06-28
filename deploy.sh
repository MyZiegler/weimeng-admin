#!/bin/bash
# deploy.sh

function usage() {
echo "
  To deploy:
  ./deploy.sh

  Deploy to admin.weiyun.xianqianapp.com:
  ./deploy.sh --to admin.weiyun.xianqianapp.com
"
}

# Empty arguments
if [[ -z "$1" ]]; then
  usage;
  exit 1;
fi

# Parse arguments
while [[ $# > 0 ]]; do
  key="$1"

  case $key in
    -t|--to|--target)
      shift
      __to="$1"
      ;;

    -h|--help)
      usage;
      exit 1;
      ;;

    *)
      usage;
      echo "  [error] unknown option:" $key;
      exit 1;
      ;;
  esac

  shift;
done

if [[ $__to = "admin.weiyun.xianqianapp.com" ]]; then
  echo "Entering shell file folder"
  cd $(dirname $0)
  pwd
  echo "npm run build";
  npm run build;
  echo "start upload";
  scp -r dist/* root@$__to:/www/wwwroot/weimeng-admin/

  remote_commands="";
  echo "service nginx reload;";
  remote_commands+="service nginx reload;";
  ssh root@$__to $remote_commands
  echo "deploy end!";
fi

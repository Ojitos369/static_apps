#!/bin/bash
while IFS= read -r line; do
    echo "in line $line"
    if [[ "$line" != \#* && "$line" == *=* ]]; then
        key=$(echo "$line" | cut -d= -f1)
        value=$(echo "$line" | cut -d= -f2- | sed 's/^"//;s/"$//')
        echo "exporting $key=\"$value\""
        export "$key=$value"
    fi
done < /usr/src/app/.env

/usr/local/bin/python /usr/src/app/app/manage.py test

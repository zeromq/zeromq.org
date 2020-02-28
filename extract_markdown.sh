#!/usr/bin/env bash

usage() {
    echo Extract a section from a markdown file identified by its header
    echo
    echo Usage:
    echo "  ./extract_markdown.sh <input file> <output file> <header1;header2;...>"
}


if [ "$#" -ne 3 ]; then
    usage
    exit 1
fi

INPUT_FILE=$1
OUTPUT_FILE=$2
HEADERS=$3

parse_markdown() {
    HEADER=$1
    LEVEL=
    while IFS=' ' read -r line
    do
        parts=( $line )
        if [ -z "$LEVEL" ]; then
            if [[ "${parts[0]}" =~ ^[#]+$ ]]; then
                if [[ $line == *$HEADER* ]]; then
                    LEVEL=${parts[0]}
                    echo "$line" >> $OUTPUT_FILE
                fi
            fi
        else
            if [[ ! "${parts[0]}" == $LEVEL ]]; then
                echo "$line" >> $OUTPUT_FILE
            else
                break
            fi
        fi
    done < $INPUT_FILE
}

IFS=';' read -ra HEADER_LIST <<< "$HEADERS"
for header in "${HEADER_LIST[@]}"; do
    parse_markdown $header
done

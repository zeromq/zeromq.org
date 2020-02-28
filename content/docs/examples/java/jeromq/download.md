---
# THIS FILE IS 100% GENERATED. If you edit this file, you will lose  your
# changes at the next build cycle. DO NOT MAKE ANY CHANGES YOU WISH TO KEEP.
name: download
language: java
library: jeromq
---

## Usage

### Maven

Add it to your Maven project's `pom.xml`:

```xml
<dependency>
<groupId>org.zeromq</groupId>
<artifactId>jeromq</artifactId>
<version>0.5.1</version>
</dependency>

<!-- for the latest SNAPSHOT -->
<dependency>
<groupId>org.zeromq</groupId>
<artifactId>jeromq</artifactId>
<version>0.5.2-SNAPSHOT</version>
</dependency>

<!-- If you can't find the latest snapshot -->
<repositories>
<repository>
<id>sonatype-nexus-snapshots</id>
<url>https://oss.sonatype.org/content/repositories/snapshots</url>
<releases>
<enabled>false</enabled>
</releases>
<snapshots>
<enabled>true</enabled>
</snapshots>
</repository>
</repositories>
```

### Ant

To generate an ant build file from `pom.xml`, issue the following command:

```bash
mvn ant:ant
```


[1mdiff --git a/assets/test.html b/assets/test.html[m
[1mindex e34a063..7f7e551 100644[m
[1m--- a/assets/test.html[m
[1m+++ b/assets/test.html[m
[36m@@ -98,11 +98,18 @@[m
                   when = event.start.date;[m
                 }[m
 [m
[32m+[m[32m                // CHECK BLUE DAY[m
                 if(event.summary === "BLUE DAY"){[m
                   writeDay("Blue");[m
                   alert("Blue Day");[m
                 }[m
 [m
[32m+[m[32m                // CHECK GOLD DAY[m
[32m+[m[32m                else if(event.summary === "GOLD DAY"){[m
[32m+[m[32m                  writeDay("Gold");[m
[32m+[m[32m                  alert("Gold Day");[m
[32m+[m[32m                }[m
[32m+[m
               // writeDay(event.summary /*+ ' (' + when + ')'*/)[m
               [m
             }[m
[36m@@ -116,7 +123,7 @@[m
           }[m
 [m
         }else {[m
[31m-          writeDay('No upcoming events found.');[m
[32m+[m[32m          writeDay("sorry couldn't catch day from calendar");[m
         }[m
 [m
       });[m

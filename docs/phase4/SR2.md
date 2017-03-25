* CRUCIAL NOTE: Please read SR2README. *

*NOTE: System design document underwent no changes this phase. A single paragraph explanation- as the professor required- has been attached to the bottom of the document.*
# SCRUM Retrospective Meeting 2- GRACE uBryte

#### March 16, 2017 
#### 7:30 PM - 8:30 PM
---
### Participants:
***
##### Julius Barboza, barboza4
##### Shayan Ghazi, ghazisha
##### Mohammed Hossain, hossa170
##### Vincent Nafrada, nafradav 
##### Abdulqader Saafan, saafanab
***

# Unfinished tasks:

- Account settings
- Code saving
- Code importing

As before, these tasks are accordingly represented in PivotalTracker. 

# Meeting Overview:

In retrospective two the GRACE team continued to note their challenges and errors from Sprint 1. Once more, the entire team held the meeting (from March 16, 2017, 7:30PM - 8:30 PM). 

The meeting primarily consisted of reflecting on our past successes and failures, and getting the entire team up to speed with the overall developmental status of the project. While there remained tasks to complete by the end of sprint 2, our team was much more successful than the previous sprint. As a result, our product backlog remained largely unchanged- minus the removal of completed tasks- and the unfinished user stories did not require any descriptive adjustment. 

The majority of the difficulties in sprint 2 stemmed from escalation. While we succesfully employed the strategies we wanted to attempt at the end of sprint 1, the immense size of the syntactical work divided in this sprint caught us off guard. For example, code importing seemed to be simple task, but was upgraded once internals about JSON, BSON, and FS were discovered- as files would not always import in the right textual format.

Consequently, we updated our product backlog's weightings, strictly increasing the weight of tasks we initially underestimated- such as code importing. These increases were decided upon through group consensus. Aside from this and removal of tasks which we'd completed, the backlog did not require much changing.

Neither, on the other hand, did our CRC model. We are still adhering to the DAO design pattern as it applies to MEAN. However, we may make changes in the next sprint as some of our members have been fostering new ideas for how to model tasks.

Some of the strongest processes we implemented and want to continue are:
- Staying in designated pairs for task completion (as before)
- Regular pair programming (this provided one of the biggest benefits, especially for sifting through syntactical errors)
- Holding group coding sessions 
- Ensuring everyone codes on a unified environment
- Holding regular code verification sessions upon milestone completions

All of the aforementioned processes resulted in a successful and productive sprint 2. However, our strategy was not flawless. The most major practice we wanted to eliminate was the isolated approach to syntactical errors. Often, some of our members would encounter syntactical issues which other team members had already gotten past, but because members would get lost in their subgroup's code these errors became major time sinks.

We want to proceed in sprint 3 with new practices that would circumvent these problems. Particularly, we want to increase the amount of group coding sessions, as they proferred immense and immediately noticeable improvement in time management. Additionally, we want to bolster internal communication by regularly notifying other subgroups of which particular syntactical block each member confronts. For example, when one group would interface with MongoDB, they would notify those already experienced in handling Mongo's syntax for a quick primer and regular syntactical checks. 

The lack of syntactical checks did indeed result in our worst experience for sprint 2. One of our subgroups was stuck on a backend error regarding nodeserver's recompilation. As a result, their code would update every single second and the page would reload repeatedly (seizure warnings were also not part of the Product Backlog, unfortunately). The subgroup's members spent over 3 hours debugging, but almost immediately noticed the error after a member of another subgroup- with different experiences using nodeserver- took a look at the issue.

However, sprint 2 provided us with some of the greatest highlights of the project so far. Seeing the user interface and CSS come together, along with rough code importing, exporting, and the different modes of online compilation, was immensely satisfying. Perhaps the greatest moment of this sprint were the pair programming sessions that the Mongo/user registration team had. Where development slowed to a crawl, pair programming immediately improved and solved many of our issues.

# Meeting Conclusion:

GRACE's second SCRUM meeting successfully ensured that the team was on track to complete the assignments. We crafted a strong plan to tackle future developmental issues and are eager to return to the fold.

# SYSTEM DESIGN EXPLANATION:

Our system design document underwent no changes. As the majority of this sprint was acting on our previous design, there were scarce few changes made to the underlying project architecture. Instead, our development was mainly based on managing syntax and enacting the CRCs and design of sprint 1. To that end, sprint 1's design document has held up well- we have separated and plan to continue separating our code based on our old design. As we reach code importing and exporting, that may change (as these sections in particular were where our DAO model centered) but as of now, our objective remains to implement our original design idea within the MEAN framework.

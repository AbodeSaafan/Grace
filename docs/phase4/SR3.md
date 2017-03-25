*NOTE: System Design Document did undergo changes, and they have been explained here (and in further detail in the System Design Document itself, of course).*
# SCRUM Retrospective Meeting 3- GRACE uBryte

#### March 24, 2017 
#### 12:50 PM - 1:45 PM
---
### Participants:
***
##### Julius Barboza, barboza4
##### Shayan Ghazi, ghazisha
##### Mohammed Hossain, hossa170
##### Vincent Nafrada, nafradav 
##### Abdulqader Saafan, saafanab
***

# Unfinished Tasks:

- Nothing.

Our tasks are all marked as finished on PivotalTracker, and therefore reflects our progress exactly. 

# Meeting Overview:

In retrospective three, the GRACE team reflected on their successes, errors, and challenges across Sprint 3. Once more, the meeting was held by the entire team (from March 24, 2017, 12:50 PM - 1:45 PM).

This meeting primarily consisted of reflections on the project completion, and discussions on presentation and potential future applications of skills the team learned through the project. As we successfully completed our entire vision for the project, the mood was a lot more relaxed. Where the majority of issues in Sprint 2 stemmed from escalation, and Sprint 1 from environmental integration, Sprint 3 was relatively devoid of major developmental issues and led to our success. 

Indeed, as our vision came to conclusion, our product backlog remained unchanged in scope- though the completed stories were removed as always. As a result, user stories did not require any descriptive or numeric adjustment. However, as mentioned in the Sprint 2 retrospective, changes which we planned to the CRC model were implemented here. Due to AngularJS' component design, services, and our API format, we had to reconsider our CRC model. As it became more and more clear that components would function as "objects" which we needed, and class collaborations would correspond to injections, we refit our overall design to have it meld with these. We essentially blueprinted the components and services we needed as classes, and the dependency injections as collaborative relationships. 

Components correspond to classes as they are, semantically, our form of instances with shared functions and variables- no different than the definition of a Java object. Dependency injections are collaborative relationships, as these correspond to having knowledge and access to another class. As a result, we refit our blueprints and grafted a clear, easily translatable design which the project followed to success.

On that note, the completion and realization of our initial vision was one of the best experiences we had in Sprint 3, and perhaps the single best one throughout the project. Through all the developmental issues and frustrations, acknowledging that our team was able to employ the tactics learned in CSC301 and rise above it all was immensely satisfying. Additionally a close second would be employing by far the most efficient and consistently productive workflow our team had to date- cumulatively using the best of what we learned in CSC301 to make for a superbly enjoyable (if exhausting) final coding session.

Such consistency was only attained through several good practices. We employed all of the practices which worked for us in the past, such as:
- Staying in designated pairs for task completion 
- Regular pair programming 
- Holding group coding sessions 
- Ensuring everyone codes on a unified environment
- Holding regular code verification sessions upon milestone completions
However, in this sprint we both perfected these strategies and augmented them with newer ones. For example, our group coding sessions were held daily, and coupled with pair programming it led to efficient programming which would effortlessly thwart bugs and micromanagement issues. In the vein of thwarting bugs, we would also hold regular refactoring sessions which led our code to be much more digestible and easily editable. We also adjusted roles on the fly, so that some developers more familiar with issues on one end were able to help others out in an organized manner- all while integrating with PivotalTracker better than ever before. All of this led to intense levels of productivity and the successful final deployment we see here.

On the other hand, our practices often resulted in some sleepless nights. Though it was among our best experiences, the very-productive work sessions we had also led to some of our worst experiences in this semester. Much of this was due to the demanding nature of the final stretch of this product in contrast with the demanding nature of other courses. The majority of our members lost sleep trying to manage the project and other courses; this had a negative our grades in other courses like CSC363/309/358 and MAT301. 

Of course, while we may laud our workflow for being so efficient, it was not flawless. Aside from sleep deprived mistakes, our negative practices were mostly because of how much time we spent on various stylistic choices. Though we are satisfied with our final product's look, it went through around 5 completely different-but-still-good visual overhauls. This time could likely have been used for more salient extra features. Additionally, some of our coding sessions went rather off topic due to our desire to tackle both this project and other course work. 

Looking to the next phase, as we do not have any more coding sessions, much of the strategies we used in this sprint will not be applicable. Of course, we must still hold group meetings for presentation's sake and hopefully drop the sleep deprivation practice as well, but aside from that a more interesting application is to future coding projects. We want to continue all the best practices we implemented in Sprint 3. However, we also want to ensure that these practices are used from the very first day of coding in future projects, so we can avoid sleepless nights. Additionally, we want to very clearly hold a consensus on what exact visual language projects should convey at every step of the sprint. 

The main practice which we want to avoid the most is the extensive ongoing debate on visual implementation, and implementing the previous practices should stop it from reappearing in our future endeavors. Furthermore, we want to also avoid the practice of intermittently dropping the project in the wake of different course loads. Sometimes this is unavoidable, but the desire to put more effort into avoiding it remains.

Overall, Sprint 3 was a massive success for us. Despite driving us to extreme amounts of sleep deprivation, seeing our successful product in action was immensely satisfying. The GRACE team stands proud of their work in this project, and eagerly awaits the opportunity to display their work to their peers. 

## System Design Document changes:
As mentioned before, the CRC design changed in this implementation, and with it the CRC model. Consequently our System Design document changed as well- but only on the parts identifying CRC design, as our technology remained the same. For a quick explanation of why our CRC cards changed, see above where the retrospective delves into CRC and how it relates to Angular's components and services. To note: this was "foreshadowed" in the previous sprint, and was our plan for a while as we always knew that enhanced understanding of MEAN would inevitably lead to design changes. 

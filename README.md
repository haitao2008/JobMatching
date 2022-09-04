# JobMatching

The matching criteria is that split the skills into a string list for both jobs and candidates. For a certain job use the skills list to intersect with each candidate�s skill list. The one who has the max count of intersection is the candidate we are looking for.

The following code show the core logic to find the most matched candidate.
var mostMatchedCandidate = candidates.MaxBy(x => x.Skill_Tag.Intersect(job.Skill_Tag).Count());



#Debug in your local

Download the repository to your local, open JobMatching.sln using Visual studio 2022 and run 


After that open the folder JobMatchingWeb using vs code and in the terminal type 'npm start' to run the angular app.


#Live Demo
You can also find the live demo which has been deployed to Azure.
https://jobmatchingweb.azurewebsites.net. It will take a while to show the list for the first time because I am using a Free/shared app service.






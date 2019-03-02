# WorkFlow

## Why should i make a branch and what should I name it?
1. Create a new branch by using:
   - `git checkout -b "insert branch name here"`
2. For each task in a user story please create a feature branch with a name that describe said feature.
   - **branch naming rules**:
      - Name should use all lowercase
      - use dash for spaces ex: `html-login-admin`
3. Done with your ~~branch~~?
   - After finishing the task of your feature please delete said branch by using:
     - `git branch -D html-login-admin`

## To commit or not to commit?
- [x]Commit (**Always commit your changes to your branch**)
- [ ]Do not commit (**Look above**)
1. Create a commit by using:
   - `git commit -m "message that describe the changes you made"`

## So you finish your task how do get your changes from branch ->master?
1. **RULE # 1**
     - Before you attempt to push your changes to the repo please update your code that your teammate might have edited by using:
       - `git pull origin master`
2. So after updating your code and your wonderful teammate (Paul) hasn't break anything then **PUSH**:
   - `git push origin html-login-admin`
   - Why should I push when i finish my feature?
     - By pushing to the repo your team is now able to use a pull request to update their code and implement said feature inside their
       branch. 
 ## What's this merging thing? ##
 - **If you are asking this question please refrain from merging**
 1. Essentially merge integrate the changes from one branch into another. Think **DBZ fusion**
    - Example: branch 1 = Goku, branch 2 = Vegeta
      - `git merge Goku Vegta` = **Vegito**

 ## Avoiding merge conflicts ##
 1. Each team member will be working on a relatively isolated section of code.
	- This will reduce the amount of merge conflicts as the code we write individually won't affect others' as often
	- This will also allow us to create more focused code.
 2. Any member's completed code and updates will be submitted as a pull request.
	- A non technical member, likely the Project Manager, will review the pull requests, suggest changes, check for conflicts, and merge when possible


# Omniscient Personal Front-End

### Collaboration Standards

1. Tasks are defined in [Notion](https://www.notion.so/cognitar/0909adb4109f4cbd982dd109b7bbd83c?v=e604b6bc01514dbf9fc6f20e684a9d08)
2. Upon completion of the task, commit should be pushed to branch **dev**.
3. Commit should be named like: [TASK_ID] TASK_NAME.
4. Before pushing to **dev** branch, ensure that commit is working as intended.
5. Before pushing to **dev** branch, try use linter / format the code for readibility.

- To deploy, create a pull request comparing **dev** to **main**.
  <br><span style="color:red; font-weight:bold">NEVER PUSH TO THE MAIN BRANCH WITHOUT APPROVAL</span>

<h3 style="color: green;">Coding Standards</h3>

<h4>Our goal is to make the project as easy to use as possible. Components allow you to divide the interface into independent, reusable parts and think about each part separately.</h4>

1. Any ".tsx" components are located in the _"components"_ folder.

2. Static information that can be changed at any time is located in the _"consts"_ folder.

3. The _"public"_ folder contains images, icons, etc.

4. In the _"types"_ folder, we must insert all TypeScript interfaces/types.

5. The _"utils"_ folder is used for functions, custom hooks, sampling...

6. _".env.local"_ contains information such as API keys, URLs, SECRET keys...

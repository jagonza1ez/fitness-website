# Common Git Commands

Here’s a quick reference guide to keep you on track:

---

### ✨ Getting Started
- **Initialize a new repository**  
  ```bash
  git init
  ```
- **Clone an existing repository**  
  ```bash
  git clone <repo_url>
  ```

---

### 📄 Tracking Changes
- **Check status of working directory**  
  ```bash
  git status
  ```
- **Stage files for commit**  
  ```bash
  git add <file>    # Add a specific file
  git add .         # Add all modified files
  ```

---

### ✅ Committing Work
- **Commit staged changes with a message**  
  ```bash
  git commit -m "message"
  ```

---

### 🔀 Branching and Merging
- **List branches**  
  ```bash
  git branch
  ```
- **Create a new branch**  
  ```bash
  git branch <new_branch>
  ```
- **Switch to a branch**  
  ```bash
  git checkout <branch>
  ```
- **Merge changes from one branch into another**  
  ```bash
  git merge <branch>
  ```
- **Create and switch to a new branch**  
  ```bash
  git checkout -b <new_branch>
  ```

---

### 👨‍💻 Remote Collaboration
- **List remote repositories**  
  ```bash
  git remote -v
  ```
- **Fetch changes from a remote branch**  
  ```bash
  git fetch origin <branch>
  ```
- **Merge fetched changes**  
  ```bash
  git merge origin/<branch>
  ```
- **Push changes to a remote branch**  
  ```bash
  git push origin <branch>
  ```

---

### 🔎 Tracking History
- **Show a list of commits**  
  ```bash
  git log
  ```
- **Display a condensed commit history**  
  ```bash
  git log --oneline
  ```

---

### ⏪ Undoing Mistakes
- **Reverse a specific commit**  
  ```bash
  git revert <commit>
  ```
- **Reset working directory to last commit (use with caution!)**  
  ```bash
  git reset --hard HEAD
  ```

---

### 🏷 Tagging Milestones
- **List existing tags**  
  ```bash
  git tag
  ```
- **Create a new tag for a specific commit**  
  ```bash
  git tag -a v1.0 -m "tag"
  ```

---

### ⚙ Configuration
- **Set global username**  
  ```bash
  git config --global user.name "name"
  ```
- **Set global email**  
  ```bash
  git config --global user.email "email"
  ```

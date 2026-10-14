# Fortune Cookie

A tiny website with two cookies: the orange-labeled **From the class** cookie shows a fortune or quote
written by a student (through a pull request), and **Surprise me** shows a fortune
made by the page itself.

**Live site:** https://YOUR-USERNAME.github.io/fortune-cookies/

---

## Add your fortune or quote (about 10 minutes)

Everything happens in the browser. No installation needed.

### 1. Create your branch

On the repo's main page, click the **main ▾** button above the file list.
Type `fortune-yourname` and click **Create branch: fortune-yourname from main**.

Check that the button now shows your branch name, not `main`.

### 2. Create your fortune file

Open the `fortunes` folder → **Add file** → **Create new file**.

Name it with **your GitHub username**, for example `octocat.json`, and write:

A fortune:

```json
{
  "type": "fortune",
  "text": "Your next bug will teach you something wonderful."
}
```

Or a quote:

```json
{
  "type": "quote",
  "text": "We delight in the beauty of the butterfly.",
  "author": "someone"
}
```

Rules:

- `type`: `"fortune"` or `"quote"`.
- `text`: your message, **200 characters max**. Keep it kind and fun, and no emojis.
- `author`: required for a quote, not used for a fortune.
- Don't touch any other file.

Ideas: advice, a funny prediction, a tiny poem, a coding superstition.

### 3. Commit to your branch

Click **Commit changes…**, write a message like `Add my fortune`,
choose **Commit directly to the fortune-yourname branch**, then **Commit changes**.

### 4. Open a pull request

Click **Compare & pull request** in the yellow banner.
Check it says **base: main ← compare: fortune-yourname**.
Fill in the checklist and click **Create pull request**.

### 5. Wait for the check

A robot checks your file. If you see a red ❌, click **Details** and read the message.
Fix your file **on your branch**: the pull request updates by itself and the check runs again.

### 6. Review a classmate

Open a classmate's pull request → **Files changed** → click **+** on a line to comment
(a compliment or a suggestion) → **Review changes** → **Approve** → **Submit review**.

### 7. Watch it go live

Don't merge it yourself: your teacher merges it live. About a minute later the site
rebuilds. Crack the **From the class** cookie until you find yours (its slip is blue and shows your GitHub name)!

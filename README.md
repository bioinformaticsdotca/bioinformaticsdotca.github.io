# CBW Filterable Workshops Page

This project is a dynamic, client-side rendered webpage designed to display and filter the workshop offerings of the Canadian Bioinformatics Workshops (CBW). It uses a single HTML file and a JSON data source to create a searchable, filterable interface for users to discover relevant workshops.

The entire system is configured with an automated CI/CD (Continuous Integration/Continuous Deployment) pipeline using GitHub Actions, which validates the data integrity before deploying updates to GitHub Pages.

**Live Demo:** [https://cbw-dev.github.io/homepage-testing/](https://cbw-dev.github.io/homepage-testing/)

## Features

* **Dynamic Rendering:** All workshop content is loaded from a central `workshops.json` file.
* **Automated Sectioning:** Automatically separates workshops into an "Upcoming & Happening Now" section and past years.
* **Live Text Search:** An instant search bar that filters workshops by title, topics, location, and instructors.
* **Multi-Faceted Filtering:** A comprehensive set of dropdown filters for Year, Region, Workshop Title, Topics, Format, and Status.
* **Dynamic Status Flags:** Cards are automatically flagged as "Upcoming" or "Happening Now" based on the current date.
* **Self-Hosted Images:** All workshop images are stored locally within the project for improved reliability.
* **Automated Data Validation:** A GitHub Action automatically checks every change to `workshops.json` against a defined schema, preventing invalid data from being deployed.
* **Automated Deployment:** Successful and validated changes to the `main` branch are automatically deployed to the live GitHub Pages site.

## Project Structure

```
your-project-folder/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Action for validation and deployment.
├── img/                    # Directory for all workshop images.
│   └── example-image.jpg
├── .vscode/
│   └── settings.json       # VS Code settings for live validation.
├── index.html              # The main and only HTML file for the website.
├── package.json            # Defines Node.js project dependencies for validation.
├── workshops.json          # The data source for all workshop content.
├── schema.json             # The rulebook that defines a valid workshop entry.
└── README.md               # This documentation file.
```

## How to Update Content

All workshop information is managed in the **`workshops.json`** file. To add, remove, or modify a workshop, you only need to edit this file.

### Step 1: Add Your Image

Place your new workshop image inside the `/img` folder.

### Step 2: Edit workshops.json

Each workshop is a JSON object with the following fields:

| Field       | Type    | Description                                                                                             | Required |
| :---------- | :------ | :------------------------------------------------------------------------------------------------------ | :------- |
| `url`       | `string`  | A valid URL for the workshop's info page. Use `"#"` if none exists.                                      | Yes      |
| `title`     | `string`  | The official title of the workshop.                                                                     | Yes      |
| `instructors` | `array`   | A list of instructor names. This is searchable but not displayed on the card.                                 | No       |
| `tags`      | `array`   | A list of strings for relevant topics (e.g., `"genomics"`, `"r"`).                                       | Yes      |
| `regions`   | `array`   | A list of one or more regions. **Must** be from the allowed list: `"BC"`, `"Alberta"`, `"Prairies"`, `"Ontario"`, `"Quebec"`, `"Atlantic"`, `"Online"`. | Yes      |
| `year`      | `number`  | The four-digit year the workshop takes place in.                                                        | Yes      |
| `startDate` | `string`  | The workshop's start date in **`YYYY-MM-DD`** format.                                                   | Yes      |
| `endDate`   | `string`  | The workshop's end date in **`YYYY-MM-DD`** format.                                                     | Yes      |
| `image`     | `string`  | The relative path to the image. The file **must** be in the `img/` folder (e.g., `img/my-image.png`). | Yes      |
| `location`  | `string`  | The physical location or platform (e.g., `"Toronto, ON"`, `"Online"`).                                  | Yes      |
| `format`    | `string`  | The delivery format. **Must** be one of: `"Online"`, `"In-person"`, `"Distributed"`, `"Flipped"`, `"Asynchronous"`. | Yes      |

### Example Entry:

This example demonstrates a workshop with multiple instructors, tags, and regions.

```json
{
    "url": "#",
    "title": "Introduction to R for Biologists",
    "instructors": ["Dr. Hadley Wickham", "Dr. Jenny Bryan"],
    "tags": ["r", "development", "introduction"],
    "regions": ["BC", "Alberta", "Prairies"],
    "year": 2025,
    "startDate": "2025-08-18",
    "endDate": "2025-08-22",
    "image": "img/intro-r.png",
    "location": "Distributed",
    "format": "Distributed"
}
```

## Local Development & Validation

While not required for simple edits, a local setup provides a much better editing experience.

**Prerequisites:**

* [Node.js](https://nodejs.org/) (LTS version)
* [Visual Studio Code](https://code.visualstudio.com/) (Recommended Editor)

### Live Validation in VS Code (Recommended)

This repository includes a configuration file (`.vscode/settings.json`) that enables automatic, real-time validation within Visual Studio Code.

**How it Works:**
When you open the project folder in VS Code, the editor automatically uses the `schema.json` to check the `workshops.json` file as you type.

* **Error Highlighting:** Any mistake, such as an invalid `format` value or a misspelled field name, will be immediately underlined in red. Hovering over the error will show a detailed explanation.
* **Autocomplete:** For fields with a predefined list of options (like `format` and `regions`), VS Code will provide autocomplete suggestions, making it easier to enter valid data.

To take advantage of this feature, simply clone the repository and open the project folder in VS Code.

### Manual Validation via Command Line

After installing the project dependencies with `npm install`, you can validate the data from your terminal at any time:

```bash
npm run validate
```

This will immediately tell you if your data is valid or print specific errors.

## Deployment

This project uses a CI/CD pipeline. **Pushing changes to the `main` branch is equivalent to deploying to production.**

1.  When a change is pushed to the `main` branch, the GitHub Action in `.github/workflows/deploy.yml` is automatically triggered.
2.  The Action first runs the `validate` job. If validation fails, the workflow stops, and the site is not deployed.
3.  If validation succeeds, the `deploy` job runs, which pushes the static content (including the `/img` folder) to the GitHub Pages environment.
4.  You can monitor the progress and see the logs for any run by clicking the **"Actions"** tab in the GitHub repository.

## Common Debugging Steps

Follow these diagnostic steps if the live site is not working as expected.

### 1. Symptom: The page is blank or workshops are not displaying.

* **Diagnosis:** This indicates a client-side JavaScript error.
* **Solution:** Open the live website in your browser. Open the **Developer Tools** (`F12` or `Ctrl+Shift+I`) and click on the **Console** tab. Look for any error messages printed in red. The error will point to the cause of the failure.

### 2. Symptom: My recent changes are not appearing on the live site.

* **Diagnosis:** The deployment either failed or is still in progress, or you are seeing a cached version.
* **Solution:**
    1.  **Check the Action Log:** Go to the **"Actions"** tab of the repository. A **red 'X'** on the latest run means the validation or deployment failed; click into the log to see why. A **yellow circle** means it is still running.
    2.  **Clear Your Cache:** If the deployment was successful (green checkmark), you are likely seeing an old version. First, try a "hard refresh" (`Ctrl+Shift+R` or `Cmd+Shift+R`). If that fails, try opening the site in a private/incognito window.

### 3. Symptom: A workshop card is showing a broken image.

* **Diagnosis:** The path in the `image` field of `workshops.json` is incorrect, or the image file was not pushed to the repository.
* **Solution:**
    1.  Verify that the image file exists inside the `/img` folder in your repository.
    2.  Check the `workshops.json` entry for that workshop and ensure the value of the `image` field is the correct relative path (e.g., `img/your-image-name.jpg`).
    3.  Remember that filenames are case-sensitive. `img/MyImage.JPG` is different from `img/myimage.jpg`.

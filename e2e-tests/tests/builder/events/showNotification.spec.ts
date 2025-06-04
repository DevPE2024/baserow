import { createBuilderElement } from "../../../fixtures/builder/builderElement";
import { createBuilderWorkflowAction } from "../../../fixtures/builder/builderWorkflowAction";
import { expect, test } from "../../baserowTest";

test.describe("Builder page show notification action test suite", () => {
  let element1, element2;
  test.beforeEach(async ({ builderPagePage }) => {
    element1 = await createBuilderElement(
      builderPagePage.builderPage,
      "button",
      { value: "'First button'" }
    );
    element2 = await createBuilderElement(
      builderPagePage.builderPage,
      "button",
      { value: "'Second button'" }
    );
    const result = await createBuilderWorkflowAction(
      builderPagePage.builderPage,
      element2,
      "notification",
      "click",
      {}
    );
    await builderPagePage.goto();
  });

  test("Can add an action to an event", async ({ page, builderPagePage }) => {
    await builderPagePage.selectButtonByName("First button");

    const eventsTab = await builderPagePage.getElementEventsTab();

    await eventsTab.getByText("add action").click();

    await expect(
      eventsTab.getByText("Show Notification").locator("visible=true"),
      "Checks the action was created."
    ).toBeVisible();

    await expect(eventsTab.getByText("Title")).toBeVisible();
  });

  test("Can change the action of an event", async ({
    page,
    builderPagePage,
  }) => {
    await builderPagePage.selectButtonByName("Second button");

    const eventsTab = await builderPagePage.getElementEventsTab();

    await expect(
      eventsTab.getByText("Show Notification").locator("visible=true"),
      "Checks the action was created."
    ).toBeVisible();

    await expect(eventsTab.getByText("Title")).toBeVisible();

    await builderPagePage.changeDropdown("Show Notification", "Create a Row");

    await expect(
      eventsTab.getByText("Integration", { exact: true })
    ).toBeVisible();
  });
});

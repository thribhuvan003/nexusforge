
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** nexusforge
- **Date:** 2026-05-11
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Create a new organism from a raw idea seed
- **Test Code:** [TC001_Create_a_new_organism_from_a_raw_idea_seed.py](./TC001_Create_a_new_organism_from_a_raw_idea_seed.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/3fb5e3c5-1643-4334-b458-aa7a5b95054e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Birth an organism from the landing page
- **Test Code:** [TC002_Birth_an_organism_from_the_landing_page.py](./TC002_Birth_an_organism_from_the_landing_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/112ac567-60ae-4609-b43f-e3d91de3b56e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Create a new organism from the landing page
- **Test Code:** [TC003_Create_a_new_organism_from_the_landing_page.py](./TC003_Create_a_new_organism_from_the_landing_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/e6789b5c-081c-4e02-bcb0-c8be147436e3
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Inspect the DNA Core on a created organism
- **Test Code:** [TC004_Inspect_the_DNA_Core_on_a_created_organism.py](./TC004_Inspect_the_DNA_Core_on_a_created_organism.py)
- **Test Error:** TEST BLOCKED

The organism detail page could not be tested — the requested organism appears to be missing or deleted.

Observations:
- The page title displays "ORGANISM VOID" and the message "The requested organism does not exist or has been deleted."
- No DNA Core, Swarm Agents, Family Tree, Telemetry tabs, or organism detail content are present on this page; only navigation and an "ALL ORGANISMS" button are available.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/6e052f79-e253-45a6-a768-e7dfd5b2f833
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Force evolution and see new DNA mutations appear
- **Test Code:** [TC005_Force_evolution_and_see_new_DNA_mutations_appear.py](./TC005_Force_evolution_and_see_new_DNA_mutations_appear.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the UI prevents creating the prerequisite organism required to exercise the Force Evolution flow.

Observations:
- The /create page shows a text input and a 'BIRTH ORGANISM' button that is disabled.
- The deployed /organisms page shows STORAGE EMPTY (no existing organisms to select).
- Previously visited organism detail pages displayed 'Organism Void', so no target organism exists on this host.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/cba1682f-c011-4bcc-95ec-6b5f115e17f9
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Open the export data modal and close it
- **Test Code:** [TC006_Open_the_export_data_modal_and_close_it.py](./TC006_Open_the_export_data_modal_and_close_it.py)
- **Test Error:** TEST BLOCKED

The export flow could not be tested — the organism detail page is unavailable or the organism has been deleted.

Observations:
- The page displays 'ORGANISM VOID' with the message: 'The requested organism does not exist or has been deleted.'
- No export action or organism details were present on the page; only the 'ALL ORGANISMS' button is visible.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/aac9165d-26d7-4bfb-92ba-471f0626c19d
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 See creation progress while an organism is being born
- **Test Code:** [TC007_See_creation_progress_while_an_organism_is_being_born.py](./TC007_See_creation_progress_while_an_organism_is_being_born.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/04d30569-cc1c-4adb-87dc-a1a9721a2cf4
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Trigger a dream and see dream DNA fragments appear
- **Test Code:** [TC008_Trigger_a_dream_and_see_dream_DNA_fragments_appear.py](./TC008_Trigger_a_dream_and_see_dream_DNA_fragments_appear.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the organism required for exercising the Trigger Dream feature is missing on the deployed site.

Observations:
- The organism detail page shows a prominent 'ORGANISM VOID' message stating the requested organism does not exist or has been deleted.
- Only an 'ALL ORGANISMS' button and top navigation are visible; no action buttons (Trigger Dream, Force Evolution, Export Data) or organism tabs are present.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/d6618ad4-9482-42af-8647-b2dc23f391f9
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Chat with the swarm agents from an organism detail page
- **Test Code:** [TC009_Chat_with_the_swarm_agents_from_an_organism_detail_page.py](./TC009_Chat_with_the_swarm_agents_from_an_organism_detail_page.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the organism detail page is unavailable and the UI needed to test the Swarm Agents chat is not present.

Observations:
- The page displays 'ORGANISM VOID' with the message 'The requested organism does not exist or has been deleted.'
- No Swarm Agents tab or chat UI elements are present; only site navigation and an 'ALL ORGANISMS' button are available.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/cf990a96-2f75-48c8-807c-e35da8e38965
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Open DNA Core for an existing organism and inspect its strands
- **Test Code:** [TC010_Open_DNA_Core_for_an_existing_organism_and_inspect_its_strands.py](./TC010_Open_DNA_Core_for_an_existing_organism_and_inspect_its_strands.py)
- **Test Error:** TEST BLOCKED

The organism detail page cannot be tested because the requested organism is missing or deleted.

Observations:
- The page shows a large 'ORGANISM VOID' heading.
- The message 'The requested organism does not exist or has been deleted.' is displayed.
- A button labeled 'ALL ORGANISMS' is present (no organism details or DNA Core tab available).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/d68d07a7-867b-40d3-b431-f4228d180389
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Trigger evolution and see new DNA strands appear
- **Test Code:** [TC011_Trigger_evolution_and_see_new_DNA_strands_appear.py](./TC011_Trigger_evolution_and_see_new_DNA_strands_appear.py)
- **Test Error:** TEST BLOCKED

The organism detail page could not be used for testing — the requested organism does not exist or has been deleted, so the Force Evolution action cannot be triggered.

Observations:
- The page displayed 'ORGANISM VOID' and the message 'The requested organism does not exist or has been deleted.'
- No organism detail view, tabs (DNA Core, Swarm Agents, Family Tree, Telemetry), or action buttons (Force Evolution, Trigger Dream, Export Data) were visible on the page.
- An 'ALL ORGANISMS' button is present to navigate back to the organisms list.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/182d68eb-0e6e-4519-b0cc-01b97306cb5f
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 Trigger dream and see new organism state appear
- **Test Code:** [TC012_Trigger_dream_and_see_new_organism_state_appear.py](./TC012_Trigger_dream_and_see_new_organism_state_appear.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the organism detail page shows that the requested organism is missing, so the Trigger Dream action cannot be exercised.

Observations:
- The detail page displays a large "ORGANISM VOID" message stating the organism does not exist or has been deleted.
- Only a single button ('ALL ORGANISMS') and top navigation links are present; tabs and action buttons (Trigger Dream, Force Evolution, etc.) are not available.
- No dream result or organism state UI is present to verify an update.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/07a6ade5-ca41-4dc7-8e5e-73312577d9ec
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 Open Swarm Agents chat and send a message
- **Test Code:** [TC013_Open_Swarm_Agents_chat_and_send_a_message.py](./TC013_Open_Swarm_Agents_chat_and_send_a_message.py)
- **Test Error:** TEST BLOCKED

The test could not be run — no organisms exist in the organisms list so the organism detail page (and Swarm Agents tab) could not be reached.

Observations:
- The organisms page shows a prominent 'STORAGE EMPTY' message
- No organism cards are visible on the page
- The Swarm Agents tab could not be opened because no organism was available
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/17d229ca-7de1-4b79-acbd-563c387354c0
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 Continue from swarm agents to family tree inspection
- **Test Code:** [TC014_Continue_from_swarm_agents_to_family_tree_inspection.py](./TC014_Continue_from_swarm_agents_to_family_tree_inspection.py)
- **Test Error:** TEST BLOCKED

The organism detail page could not be tested — the organism appears to be missing or deleted, so the organism UI (chat area, tabs, and family tree) is not available.

Observations:
- The page displays 'ORGANISM VOID' and the text 'The requested organism does not exist or has been deleted.'
- The organism detail UI (tabs: DNA Core, Swarm Agents, Family Tree, Telemetry) is not present on the page
- Only navigation links and an 'ALL ORGANISMS' button are available
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/7d818e5a-7ad3-4b9a-91c6-ce0e215ecd12
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Open an organism from bio-storage
- **Test Code:** [TC015_Open_an_organism_from_bio_storage.py](./TC015_Open_an_organism_from_bio_storage.py)
- **Test Error:** TEST BLOCKED

The test could not be run — no organism cards are available to open from the organisms list.

Observations:
- The organisms page shows 'STORAGE EMPTY' and a 'BIRTH FIRST ORGANISM' button.
- No organism cards were found on the page, so the action "Click an organism card" cannot be performed.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/b5c6d74c-d15c-4aa5-9097-7af84bbe9cca
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Browse public organisms from bio-storage to a detail page
- **Test Code:** [TC016_Browse_public_organisms_from_bio_storage_to_a_detail_page.py](./TC016_Browse_public_organisms_from_bio_storage_to_a_detail_page.py)
- **Test Error:** TEST BLOCKED

No organism entries exist in the organisms list, so the test cannot be run — there is no organism to open and inspect.

Observations:
- The organisms list page shows 'STORAGE EMPTY' and a prominent 'BIRTH FIRST ORGANISM' button.
- No organism cards or list entries are visible on the page.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/1e4937d3-6db9-468e-81e7-1dcf6ceb5d41
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Browse bio-storage and open an organism detail page
- **Test Code:** [TC017_Browse_bio_storage_and_open_an_organism_detail_page.py](./TC017_Browse_bio_storage_and_open_an_organism_detail_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/54ac5be4-53d9-4b49-9619-9f883126391c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 Breed two organisms into a new offspring
- **Test Code:** [TC018_Breed_two_organisms_into_a_new_offspring.py](./TC018_Breed_two_organisms_into_a_new_offspring.py)
- **Test Error:** TEST FAILURE

The breeding feature could not be tested because the breeding page is unavailable (404). The /breed route returns a not-found page, so selecting two organisms and starting a breed run is not possible on the deployed site.

Observations:
- Navigated to https://nexusforge-seven.vercel.app/breed and the page shows '404 This page could not be found.'
- No interactive breeding UI or controls were present on the /breed page, and previous attempts to create organisms showed storage empty or no confirmed births.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/ce7c15ba-8890-4d39-a7ab-09107dc47965
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 Keep the user in the create flow after completion when no redirect occurs
- **Test Code:** [TC019_Keep_the_user_in_the_create_flow_after_completion_when_no_redirect_occurs.py](./TC019_Keep_the_user_in_the_create_flow_after_completion_when_no_redirect_occurs.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/85c2dfc3-4d16-4f07-b2e0-3bf755562eb9
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 View organism growth analytics
- **Test Code:** [TC020_View_organism_growth_analytics.py](./TC020_View_organism_growth_analytics.py)
- **Test Error:** TEST BLOCKED

The organism detail page could not be tested — the organism appears to be missing or deleted, so the telemetry tab and analytics cannot be accessed.

Observations:
- The page displays 'ORGANISM VOID' with the message 'The requested organism does not exist or has been deleted.'
- No telemetry tab, analytics charts, or organism statistics are available on the page.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/6c7d579b-d7f0-4779-b7d0-095022aa239e
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC021 Move from organism analysis to family tree or telemetry inspection
- **Test Code:** [TC021_Move_from_organism_analysis_to_family_tree_or_telemetry_inspection.py](./TC021_Move_from_organism_analysis_to_family_tree_or_telemetry_inspection.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/bf53c074-908c-457a-94f2-9521adcd9031
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC022 Browse the landing page and reach the create flow
- **Test Code:** [TC022_Browse_the_landing_page_and_reach_the_create_flow.py](./TC022_Browse_the_landing_page_and_reach_the_create_flow.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/8831e8df-5e47-4f65-86e8-365e8c20bbfd
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC023 Complete breeding and open the offspring in bio-storage
- **Test Code:** [TC023_Complete_breeding_and_open_the_offspring_in_bio_storage.py](./TC023_Complete_breeding_and_open_the_offspring_in_bio_storage.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the breeding feature could not be reached on the deployed site.

Observations:
- Navigating to https://nexusforge-seven.vercel.app/breed returned a 404 page: "This page could not be found."
- The page contained 0 interactive elements and no breeding UI to continue the workflow.
- The organism detail path previously visited on the local site returned 'ORGANISM VOID', so the target organism was not available there either.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/92421581-b6fd-4ae1-bb7f-c4501a45820a
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC024 Inspect family tree and telemetry from an organism detail page
- **Test Code:** [TC024_Inspect_family_tree_and_telemetry_from_an_organism_detail_page.py](./TC024_Inspect_family_tree_and_telemetry_from_an_organism_detail_page.py)
- **Test Error:** TEST BLOCKED

The organism detail page could not be tested — the requested organism is missing or has been deleted, so the Family Tree and Telemetry tabs cannot be reached.

Observations:
- The page displays 'ORGANISM VOID' and the message 'The requested organism does not exist or has been deleted.'
- A prominent 'ALL ORGANISMS' button is shown (no tabs or organism details available).
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/c144343a-3efd-4f77-a174-eb6179705a2c
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC025 Browse the landing page and reach the mesh explorer
- **Test Code:** [TC025_Browse_the_landing_page_and_reach_the_mesh_explorer.py](./TC025_Browse_the_landing_page_and_reach_the_mesh_explorer.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/b9e74605-0283-4b88-93f8-c4982bf1589b
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC026 Create an offspring by breeding two organisms
- **Test Code:** [TC026_Create_an_offspring_by_breeding_two_organisms.py](./TC026_Create_an_offspring_by_breeding_two_organisms.py)
- **Test Error:** TEST FAILURE

The breeding workflow could not be executed — the /breed UI is not available.

Observations:
- Navigating to https://nexusforge-seven.vercel.app/breed returned a 404 page stating 'This page could not be found.'
- The page contains no interactive elements to select parent organisms or submit a breed request
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/121d04bb-d99e-41aa-9163-a4d825d9a491
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC027 Start breeding two organisms and confirm a new offspring exists
- **Test Code:** [TC027_Start_breeding_two_organisms_and_confirm_a_new_offspring_exists.py](./TC027_Start_breeding_two_organisms_and_confirm_a_new_offspring_exists.py)
- **Test Error:** TEST BLOCKED

The test could not be run — there are no organisms in bio-storage to select for breeding.

Observations:
- The Organisms page displays "STORAGE EMPTY" and a prominent "BIRTH FIRST ORGANISM" button.
- No organism entries or a breeding UI (/breed) link are present on the page.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/26f48532-47e4-47a9-b491-93c75d9064cd
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC028 Breed two organisms and view the new offspring
- **Test Code:** [TC028_Breed_two_organisms_and_view_the_new_offspring.py](./TC028_Breed_two_organisms_and_view_the_new_offspring.py)
- **Test Error:** TEST BLOCKED

The breeding feature could not be reached — the breeding page is not available on the deployed site.

Observations:
- Navigating to https://nexusforge-seven.vercel.app/breed showed a 404 page with the message 'This page could not be found.'
- No breeding UI or interactive elements were present on the page, so organisms could not be selected.
- The breeding flow could not be executed because the required page is missing.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/1bd9a63c-500b-4afb-bbc2-2569cc2e2ba2
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC029 Explore the public mesh and open an organism from a node selection
- **Test Code:** [TC029_Explore_the_public_mesh_and_open_an_organism_from_a_node_selection.py](./TC029_Explore_the_public_mesh_and_open_an_organism_from_a_node_selection.py)
- **Test Error:** TEST BLOCKED

The test could not be run to completion — the Mesh view did not allow selecting the organism node so the organism detail view could not be reached.

Observations:
- The right panel displays 'SELECT A NODE' and no organism details appeared.
- The SEARCH NODE input is filled with 'nexus-1778519558047-g39zhxlml' but pressing Enter did not open or select a node.
- No clickable nodes are visible in the mesh area.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/99fa26ed-536d-41c9-a8cd-18407d244613
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC030 Select an organism node in the mesh and open its detail view
- **Test Code:** [TC030_Select_an_organism_node_in_the_mesh_and_open_its_detail_view.py](./TC030_Select_an_organism_node_in_the_mesh_and_open_its_detail_view.py)
- **Test Error:** TEST BLOCKED

The test could not be run — the requested organism node could not be selected from the Mesh and the organism detail is not accessible.

Observations:
- The Mesh right panel still shows 'SELECT A NODE' after multiple search submissions and clicking the visible search-result entry.
- Searching for the organism id (nexus-1778519558047-g39zhxlml) and clicking entries did not open any organism detail.
- Visiting the organism detail URL on the local site showed 'ORGANISM VOID'.
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/c8f0e0a8-fd7b-44fc-860e-86ef7a18d3cc/a3d57224-b9e6-44f2-9480-08a4c50a29e6
- **Status:** BLOCKED
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **30.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---
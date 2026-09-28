import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createHash } from "node:crypto";
import sanitizeHtml from "sanitize-html";
import {
  cryptoTopics,
  getAllCryptoDigests,
  getAllWritingPosts,
  getPost,
  hasTag,
  isPublished,
  paginate,
  renderContent,
  singleParam,
  type Section,
} from "../lib/content";
import inventory from "../../docs/content-inventory.json";
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
test("every archived article remains reachable; unedited ones keep their original body text", () => {
  assert.equal(getAllWritingPosts().length, 16);
  assert.equal(getAllCryptoDigests().length, 32);
  assert.equal(inventory.length, 48);
  for (const record of inventory) {
    const [, section, slug] = record.url.split("/");
    const post = getPost(section as Section, slug);
    assert.ok(post, record.url);
    if (record.bodyTextSha256 && !record.editedAt) {
      const text = sanitizeHtml(post.content, {allowedTags:[],allowedAttributes:{}}).replace(/\s+/g, " ").trim();
      assert.equal(hash(text), record.bodyTextSha256, record.url);
    }
    if (record.livePublishedDate) assert.equal(post.date, record.livePublishedDate, record.url);
    if (record.fileSha256) assert.equal(hash(fs.readFileSync(`content/crypto/${slug}.md`, "utf8")), record.fileSha256);
  }
});
test("drafts, unpublished records and future dates are excluded; invalid dates fail loudly", () => {
  assert.equal(isPublished({draft:true}),false);
  assert.equal(isPublished({status:"draft"}),false);
  assert.equal(isPublished({status:"review"}),false);
  assert.equal(isPublished({date:"2999-01-01"}),false);
  assert.equal(isPublished({status:"published"}),true);
  assert.equal(isPublished({date:"2024-01-01"}),true);
  assert.throws(()=>isPublished({date:"not-a-date"}));
});
test("HTML is sanitized without dropping tables, code or language attributes", () => {
  const html=renderContent('<script>alert(1)</script><p lang="km" onclick="alert(1)">ខ្មែរ</p><a href="javascript:alert(1)">link</a><img src="/test.webp" alt="A test" onerror="alert(1)"><table><tr><th scope="col">Name</th></tr></table>\n\n```js\nconst x = 1;\n```');
  assert.doesNotMatch(html, /<script|onclick|onerror|javascript:/);
  assert.match(html,/lang="km"/);assert.match(html,/<table>/);assert.match(html,/<pre><code/);assert.match(html,/loading="lazy"/);
});
test("unknown slugs and traversal return null; archive pagination retains the final article", () => {
  assert.equal(getPost("writing","../../profile"),null);assert.equal(getPost("writing","missing"),null);
  const posts=getAllWritingPosts();assert.equal(paginate(posts,"2").items.length,1);
  assert.equal(paginate(posts,"-1").page,1);assert.equal(paginate(posts,"999").page,2);
});

test("every crypto filter topic matches at least one published article", () => {
  const posts = getAllCryptoDigests();
  for (const topic of cryptoTopics) {
    assert.ok(posts.some((post) => hasTag(post, topic)), topic);
  }
});

test("repeated or missing query parameters collapse to an empty string", () => {
  assert.equal(singleParam(["bitcoin", "defi"]), "");
  assert.equal(singleParam(undefined), "");
  assert.equal(singleParam("bitcoin"), "bitcoin");
});

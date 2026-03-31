import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { TOPIC_DEFINITIONS } from "./topicRegistry";
import { htmlSemanticsLesson } from "@/domains/topics/content/frontend/core-web-fundamentals/html-semantics/meta";
import { dnsLesson } from "@/domains/topics/content/network/DNS/meta";
import { http123Lesson } from "@/domains/topics/content/network/HTTP-1-2-3/meta";
import { tlsLesson } from "@/domains/topics/content/network/TLS/meta";
import { restLesson } from "@/domains/topics/content/api/rest/meta";
import { httpStatusCodesLesson } from "@/domains/topics/content/api/http-status-codes/meta";
import { grpcLesson } from "@/domains/topics/content/api/grcp/meta";
import { graphQlLesson } from "@/domains/topics/content/api/graph-ql/meta";
import { restGraphGrpcLesson } from "@/domains/topics/content/api/rest-graph-grcp/meta";
import { loadBalancerLesson } from "@/domains/topics/content/architecture/load-balancer/meta";
import { horizontalVerticalScalingLesson } from "@/domains/topics/content/architecture/horizontal-vertical-scaling/meta";
import { cdnLesson } from "@/domains/topics/content/architecture/cdn/meta";

describe("topic integrity", () => {
  it("keeps topic ids and routes unique", () => {
    const ids = TOPIC_DEFINITIONS.map((topic) => topic.id);
    const paths = TOPIC_DEFINITIONS.map((topic) => topic.path);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("requires ready topics to have a loader and placeholder topics to stay loader-free", () => {
    const readyTopics = TOPIC_DEFINITIONS.filter(
      (topic) => topic.status === "ready",
    );
    const placeholderTopics = TOPIC_DEFINITIONS.filter(
      (topic) => topic.status !== "ready",
    );

    expect(readyTopics.every((topic) => topic.loader)).toBe(true);
    expect(placeholderTopics.every((topic) => !topic.loader)).toBe(true);
  });

  it("keeps lesson metadata aligned with the topic registry", () => {
    const topicIds = new Set(TOPIC_DEFINITIONS.map((topic) => topic.id));

    expect(htmlSemanticsLesson.id).toBe("html-semantics");
    expect(htmlSemanticsLesson.title.length).toBeGreaterThan(0);
    expect(htmlSemanticsLesson.summary.length).toBeGreaterThan(0);
    expect(htmlSemanticsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(dnsLesson.id).toBe("dns");
    expect(dnsLesson.title.length).toBeGreaterThan(0);
    expect(dnsLesson.summary.length).toBeGreaterThan(0);
    expect(dnsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(http123Lesson.id).toBe("http-1-2-3");
    expect(http123Lesson.title.length).toBeGreaterThan(0);
    expect(http123Lesson.summary.length).toBeGreaterThan(0);
    expect(http123Lesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(tlsLesson.id).toBe("tls");
    expect(tlsLesson.title.length).toBeGreaterThan(0);
    expect(tlsLesson.summary.length).toBeGreaterThan(0);
    expect(tlsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(restLesson.id).toBe("rest");
    expect(restLesson.title.length).toBeGreaterThan(0);
    expect(restLesson.summary.length).toBeGreaterThan(0);
    expect(restLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(httpStatusCodesLesson.id).toBe("http-status-codes");
    expect(httpStatusCodesLesson.title.length).toBeGreaterThan(0);
    expect(httpStatusCodesLesson.summary.length).toBeGreaterThan(0);
    expect(httpStatusCodesLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(grpcLesson.id).toBe("grpc");
    expect(grpcLesson.title.length).toBeGreaterThan(0);
    expect(grpcLesson.summary.length).toBeGreaterThan(0);
    expect(grpcLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(graphQlLesson.id).toBe("graph-ql");
    expect(graphQlLesson.title.length).toBeGreaterThan(0);
    expect(graphQlLesson.summary.length).toBeGreaterThan(0);
    expect(graphQlLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(restGraphGrpcLesson.id).toBe("rest-graph-grcp");
    expect(restGraphGrpcLesson.title.length).toBeGreaterThan(0);
    expect(restGraphGrpcLesson.summary.length).toBeGreaterThan(0);
    expect(restGraphGrpcLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(loadBalancerLesson.id).toBe("load-balancer");
    expect(loadBalancerLesson.title.length).toBeGreaterThan(0);
    expect(loadBalancerLesson.summary.length).toBeGreaterThan(0);
    expect(loadBalancerLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(horizontalVerticalScalingLesson.id).toBe("horizontal-vertical-scaling");
    expect(horizontalVerticalScalingLesson.title.length).toBeGreaterThan(0);
    expect(horizontalVerticalScalingLesson.summary.length).toBeGreaterThan(0);
    expect(horizontalVerticalScalingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(cdnLesson.id).toBe("cdn");
    expect(cdnLesson.title.length).toBeGreaterThan(0);
    expect(cdnLesson.summary.length).toBeGreaterThan(0);
    expect(cdnLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);
  });
});

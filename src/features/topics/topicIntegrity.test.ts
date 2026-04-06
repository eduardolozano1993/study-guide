import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { TOPIC_DEFINITIONS } from "./topicRegistry";
import { htmlSemanticsLesson } from "@/domains/topics/content/frontend/fundamentals/html-semantics/meta";
import { accessibilityLesson } from "@/domains/topics/content/frontend/fundamentals/accessibility/meta";
import { cssBoxModelLesson } from "@/domains/topics/content/frontend/fundamentals/css-box-model/meta";
import { cssLayoutLesson } from "@/domains/topics/content/frontend/fundamentals/css-layout/meta";
import { responsiveDesignLesson } from "@/domains/topics/content/frontend/fundamentals/responsive-design/meta";
import { domEventsLesson } from "@/domains/topics/content/frontend/fundamentals/dom-events/meta";
import { browserRenderingLesson } from "@/domains/topics/content/frontend/fundamentals/browser-rendering/meta";
import { networkBrowserApisLesson } from "@/domains/topics/content/frontend/fundamentals/network-browser-apis/meta";
import { performanceFundamentalsLesson } from "@/domains/topics/content/frontend/fundamentals/performance-fundamentals/meta";
import { frontendSecurityLesson } from "@/domains/topics/content/frontend/fundamentals/frontend-security/meta";
import { primitiveVsReferenceTypesLesson } from "@/domains/topics/content/frontend/java-script/primitive-vs-reference-types/meta";
import { closuresLesson } from "@/domains/topics/content/frontend/java-script/closures/meta";
import { objectsDestructuringSpreadRestLesson } from "@/domains/topics/content/frontend/java-script/objects-destructuring-spread-rest/meta";
import { promisesAsyncAwaitLesson } from "@/domains/topics/content/frontend/java-script/promises-async-await/meta";
import { errorHandlingJavaScriptLesson } from "@/domains/topics/content/frontend/java-script/error-handling-javascript/meta";
import { domManipulationBasicsLesson } from "@/domains/topics/content/frontend/java-script/dom-manipulation-basics/meta";
import { esmVsCommonjsLesson } from "@/domains/topics/content/frontend/java-script/esm-vs-commonjs/meta";
import { immutabilityLesson } from "@/domains/topics/content/frontend/java-script/immutability/meta";
import { dnsLesson } from "@/domains/topics/content/network/dns/meta";
import { http123Lesson } from "@/domains/topics/content/network/http-1-2-3/meta";
import { tlsLesson } from "@/domains/topics/content/network/tls/meta";
import { restLesson } from "@/domains/topics/content/api/rest/meta";
import { httpStatusCodesLesson } from "@/domains/topics/content/api/http-status-codes/meta";
import { grpcLesson } from "@/domains/topics/content/api/grpc/meta";
import { graphQlLesson } from "@/domains/topics/content/api/graph-ql/meta";
import { restGraphGrpcLesson } from "@/domains/topics/content/api/rest-graph-grpc/meta";
import { loadBalancerLesson } from "@/domains/topics/content/architecture/patterns/load-balancer/meta";
import { horizontalVerticalScalingLesson } from "@/domains/topics/content/architecture/patterns/horizontal-vertical-scaling/meta";
import { cdnLesson } from "@/domains/topics/content/architecture/patterns/cdn/meta";
import { redisLesson } from "@/domains/topics/content/architecture/patterns/redis/meta";
import { latencyVsThroughputLesson } from "@/domains/topics/content/architecture/fundamentals/latency-vs-throughput/meta";
import { capTheoremLesson } from "@/domains/topics/content/architecture/fundamentals/cap-theorem/meta";
import { abstractionLesson } from "@/domains/topics/content/low-level-design/oop-concepts/abstraction/meta";
import { encapsulationLesson } from "@/domains/topics/content/low-level-design/oop-concepts/encapsulation/meta";
import { inheritanceLesson } from "@/domains/topics/content/low-level-design/oop-concepts/inheritance/meta";
import { polymorphismLesson } from "@/domains/topics/content/low-level-design/oop-concepts/polymorphism/meta";
import { generalSoftwarePrinciplesLesson } from "@/domains/topics/content/low-level-design/design-principles/general-software-principles/meta";
import { objectOrientedPrinciplesLesson } from "@/domains/topics/content/low-level-design/design-principles/object-oriented-principles/meta";
import { factoryMethodLesson } from "@/domains/topics/content/low-level-design/design-patterns/creational-patterns/factory-method/meta";
import { singletonLesson } from "@/domains/topics/content/low-level-design/design-patterns/creational-patterns/singleton/meta";
import { builderLesson } from "@/domains/topics/content/low-level-design/design-patterns/creational-patterns/builder/meta";
import { decoratorLesson } from "@/domains/topics/content/low-level-design/design-patterns/structural-patterns/decorator/meta";
import { facadeLesson } from "@/domains/topics/content/low-level-design/design-patterns/structural-patterns/facade/meta";
import { strategyLesson } from "@/domains/topics/content/low-level-design/design-patterns/behavioral-patterns/strategy/meta";
import { observerLesson } from "@/domains/topics/content/low-level-design/design-patterns/behavioral-patterns/observer/meta";
import { stateMachineLesson } from "@/domains/topics/content/low-level-design/design-patterns/behavioral-patterns/state-machine/meta";

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

    expect(accessibilityLesson.id).toBe("accessibility");
    expect(accessibilityLesson.title.length).toBeGreaterThan(0);
    expect(accessibilityLesson.summary.length).toBeGreaterThan(0);
    expect(accessibilityLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(cssBoxModelLesson.id).toBe("css-box-model");
    expect(cssBoxModelLesson.title.length).toBeGreaterThan(0);
    expect(cssBoxModelLesson.summary.length).toBeGreaterThan(0);
    expect(cssBoxModelLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(cssLayoutLesson.id).toBe("css-layout");
    expect(cssLayoutLesson.title.length).toBeGreaterThan(0);
    expect(cssLayoutLesson.summary.length).toBeGreaterThan(0);
    expect(cssLayoutLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(responsiveDesignLesson.id).toBe("responsive-design");
    expect(responsiveDesignLesson.title.length).toBeGreaterThan(0);
    expect(responsiveDesignLesson.summary.length).toBeGreaterThan(0);
    expect(responsiveDesignLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(domEventsLesson.id).toBe("dom-events");
    expect(domEventsLesson.title.length).toBeGreaterThan(0);
    expect(domEventsLesson.summary.length).toBeGreaterThan(0);
    expect(domEventsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(browserRenderingLesson.id).toBe("browser-rendering");
    expect(browserRenderingLesson.title.length).toBeGreaterThan(0);
    expect(browserRenderingLesson.summary.length).toBeGreaterThan(0);
    expect(browserRenderingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(networkBrowserApisLesson.id).toBe("network-browser-apis");
    expect(networkBrowserApisLesson.title.length).toBeGreaterThan(0);
    expect(networkBrowserApisLesson.summary.length).toBeGreaterThan(0);
    expect(networkBrowserApisLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(performanceFundamentalsLesson.id).toBe("performance-fundamentals");
    expect(performanceFundamentalsLesson.title.length).toBeGreaterThan(0);
    expect(performanceFundamentalsLesson.summary.length).toBeGreaterThan(0);
    expect(performanceFundamentalsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(frontendSecurityLesson.id).toBe("frontend-security");
    expect(frontendSecurityLesson.title.length).toBeGreaterThan(0);
    expect(frontendSecurityLesson.summary.length).toBeGreaterThan(0);
    expect(frontendSecurityLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(primitiveVsReferenceTypesLesson.id).toBe("primitive-vs-reference-types");
    expect(primitiveVsReferenceTypesLesson.title.length).toBeGreaterThan(0);
    expect(primitiveVsReferenceTypesLesson.summary.length).toBeGreaterThan(0);
    expect(primitiveVsReferenceTypesLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(closuresLesson.id).toBe("closures");
    expect(closuresLesson.title.length).toBeGreaterThan(0);
    expect(closuresLesson.summary.length).toBeGreaterThan(0);
    expect(closuresLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(objectsDestructuringSpreadRestLesson.id).toBe("objects-destructuring-spread-rest");
    expect(objectsDestructuringSpreadRestLesson.title.length).toBeGreaterThan(0);
    expect(objectsDestructuringSpreadRestLesson.summary.length).toBeGreaterThan(0);
    expect(objectsDestructuringSpreadRestLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(promisesAsyncAwaitLesson.id).toBe("promises-async-await");
    expect(promisesAsyncAwaitLesson.title.length).toBeGreaterThan(0);
    expect(promisesAsyncAwaitLesson.summary.length).toBeGreaterThan(0);
    expect(promisesAsyncAwaitLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(errorHandlingJavaScriptLesson.id).toBe("error-handling-javascript");
    expect(errorHandlingJavaScriptLesson.title.length).toBeGreaterThan(0);
    expect(errorHandlingJavaScriptLesson.summary.length).toBeGreaterThan(0);
    expect(errorHandlingJavaScriptLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(domManipulationBasicsLesson.id).toBe("dom-manipulation-basics");
    expect(domManipulationBasicsLesson.title.length).toBeGreaterThan(0);
    expect(domManipulationBasicsLesson.summary.length).toBeGreaterThan(0);
    expect(domManipulationBasicsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(esmVsCommonjsLesson.id).toBe("esm-vs-commonjs");
    expect(esmVsCommonjsLesson.title.length).toBeGreaterThan(0);
    expect(esmVsCommonjsLesson.summary.length).toBeGreaterThan(0);
    expect(esmVsCommonjsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(immutabilityLesson.id).toBe("immutability");
    expect(immutabilityLesson.title.length).toBeGreaterThan(0);
    expect(immutabilityLesson.summary.length).toBeGreaterThan(0);
    expect(immutabilityLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

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

    expect(restGraphGrpcLesson.id).toBe("rest-graph-grpc");
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

    expect(redisLesson.id).toBe("redis");
    expect(redisLesson.title.length).toBeGreaterThan(0);
    expect(redisLesson.summary.length).toBeGreaterThan(0);
    expect(redisLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(latencyVsThroughputLesson.id).toBe("latency-vs-throughput");
    expect(latencyVsThroughputLesson.title.length).toBeGreaterThan(0);
    expect(latencyVsThroughputLesson.summary.length).toBeGreaterThan(0);
    expect(latencyVsThroughputLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(capTheoremLesson.id).toBe("cap-theorem");
    expect(capTheoremLesson.title.length).toBeGreaterThan(0);
    expect(capTheoremLesson.summary.length).toBeGreaterThan(0);
    expect(capTheoremLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(abstractionLesson.id).toBe("abstraction");
    expect(abstractionLesson.title.length).toBeGreaterThan(0);
    expect(abstractionLesson.summary.length).toBeGreaterThan(0);
    expect(abstractionLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(encapsulationLesson.id).toBe("encapsulation");
    expect(encapsulationLesson.title.length).toBeGreaterThan(0);
    expect(encapsulationLesson.summary.length).toBeGreaterThan(0);
    expect(encapsulationLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(inheritanceLesson.id).toBe("inheritance");
    expect(inheritanceLesson.title.length).toBeGreaterThan(0);
    expect(inheritanceLesson.summary.length).toBeGreaterThan(0);
    expect(inheritanceLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(polymorphismLesson.id).toBe("polymorphism");
    expect(polymorphismLesson.title.length).toBeGreaterThan(0);
    expect(polymorphismLesson.summary.length).toBeGreaterThan(0);
    expect(polymorphismLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(generalSoftwarePrinciplesLesson.id).toBe("general-software-principles");
    expect(generalSoftwarePrinciplesLesson.title.length).toBeGreaterThan(0);
    expect(generalSoftwarePrinciplesLesson.summary.length).toBeGreaterThan(0);
    expect(generalSoftwarePrinciplesLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(objectOrientedPrinciplesLesson.id).toBe("object-oriented-principles");
    expect(objectOrientedPrinciplesLesson.title.length).toBeGreaterThan(0);
    expect(objectOrientedPrinciplesLesson.summary.length).toBeGreaterThan(0);
    expect(objectOrientedPrinciplesLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(factoryMethodLesson.id).toBe("factory-method");
    expect(factoryMethodLesson.title.length).toBeGreaterThan(0);
    expect(factoryMethodLesson.summary.length).toBeGreaterThan(0);
    expect(factoryMethodLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(singletonLesson.id).toBe("singleton");
    expect(singletonLesson.title.length).toBeGreaterThan(0);
    expect(singletonLesson.summary.length).toBeGreaterThan(0);
    expect(singletonLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(builderLesson.id).toBe("builder");
    expect(builderLesson.title.length).toBeGreaterThan(0);
    expect(builderLesson.summary.length).toBeGreaterThan(0);
    expect(builderLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(decoratorLesson.id).toBe("decorator");
    expect(decoratorLesson.title.length).toBeGreaterThan(0);
    expect(decoratorLesson.summary.length).toBeGreaterThan(0);
    expect(decoratorLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(facadeLesson.id).toBe("facade");
    expect(facadeLesson.title.length).toBeGreaterThan(0);
    expect(facadeLesson.summary.length).toBeGreaterThan(0);
    expect(facadeLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(strategyLesson.id).toBe("strategy");
    expect(strategyLesson.title.length).toBeGreaterThan(0);
    expect(strategyLesson.summary.length).toBeGreaterThan(0);
    expect(strategyLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(observerLesson.id).toBe("observer");
    expect(observerLesson.title.length).toBeGreaterThan(0);
    expect(observerLesson.summary.length).toBeGreaterThan(0);
    expect(observerLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(stateMachineLesson.id).toBe("state-machine");
    expect(stateMachineLesson.title.length).toBeGreaterThan(0);
    expect(stateMachineLesson.summary.length).toBeGreaterThan(0);
    expect(stateMachineLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);
  });
});

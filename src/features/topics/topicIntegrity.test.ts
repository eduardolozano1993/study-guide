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
import { reflowRepaintLesson } from "@/domains/topics/content/frontend/fundamentals/reflow-repaint/meta";
import { frontendSecurityLesson } from "@/domains/topics/content/frontend/fundamentals/frontend-security/meta";
import { primitiveVsReferenceTypesLesson } from "@/domains/topics/content/frontend/java-script/primitive-vs-reference-types/meta";
import { closuresLesson } from "@/domains/topics/content/frontend/java-script/closures/meta";
import { objectsDestructuringSpreadRestLesson } from "@/domains/topics/content/frontend/java-script/objects-destructuring-spread-rest/meta";
import { promisesAsyncAwaitLesson } from "@/domains/topics/content/frontend/java-script/promises-async-await/meta";
import { errorHandlingJavaScriptLesson } from "@/domains/topics/content/frontend/java-script/error-handling-javascript/meta";
import { domManipulationBasicsLesson } from "@/domains/topics/content/frontend/java-script/dom-manipulation-basics/meta";
import { esmVsCommonjsLesson } from "@/domains/topics/content/frontend/java-script/esm-vs-commonjs/meta";
import { immutabilityLesson } from "@/domains/topics/content/frontend/java-script/immutability/meta";
import { typeScriptTopicLessons } from "@/domains/topics/content/frontend/type-script/topicLessons";
import { unitTestingLesson } from "@/domains/topics/content/frontend/testing/unit-testing/meta";
import { integrationTestingLesson } from "@/domains/topics/content/frontend/testing/integration-testing/meta";
import { e2eTestingLesson } from "@/domains/topics/content/frontend/testing/e2e-testing/meta";
import { codeSplittingLesson } from "@/domains/topics/content/frontend/performance/code-splitting/meta";
import { treeShakingLesson } from "@/domains/topics/content/frontend/performance/tree-shaking/meta";
import { cachingStrategiesLesson } from "@/domains/topics/content/frontend/performance/caching-strategies/meta";
import { coreWebVitalsLesson } from "@/domains/topics/content/frontend/performance/core-web-vitals/meta";
import { webpackViteLesson } from "@/domains/topics/content/frontend/tooling/webpack-vite/meta";
import { babelTypeScriptLesson } from "@/domains/topics/content/frontend/tooling/babel-typescript/meta";
import { cicdBasicsLesson } from "@/domains/topics/content/frontend/tooling/cicd-basics/meta";
import { angularArchitectureLesson } from "@/domains/topics/content/frontend/angular/angular-architecture/meta";
import { angularComponentsTemplatesDataBindingLesson } from "@/domains/topics/content/frontend/angular/angular-components-templates-data-binding/meta";
import { angularDirectivesLesson } from "@/domains/topics/content/frontend/angular/angular-directives/meta";
import { angularInputsOutputsComponentCommunicationLesson } from "@/domains/topics/content/frontend/angular/angular-inputs-outputs-component-communication/meta";
import { angularLifecycleHooksLesson } from "@/domains/topics/content/frontend/angular/angular-lifecycle-hooks/meta";
import { angularDependencyInjectionLesson } from "@/domains/topics/content/frontend/angular/angular-dependency-injection/meta";
import { angularServicesLesson } from "@/domains/topics/content/frontend/angular/angular-services/meta";
import { angularRxjsBasicsLesson } from "@/domains/topics/content/frontend/angular/angular-rxjs-basics/meta";
import { angularHttpClientLesson } from "@/domains/topics/content/frontend/angular/angular-http-client/meta";
import { angularRoutingLesson } from "@/domains/topics/content/frontend/angular/angular-routing/meta";
import { angularReactiveFormsValidationLesson } from "@/domains/topics/content/frontend/angular/angular-reactive-forms-validation/meta";
import { angularChangeDetectionLesson } from "@/domains/topics/content/frontend/angular/angular-change-detection/meta";
import { angularInterceptorsLesson } from "@/domains/topics/content/frontend/angular/angular-interceptors/meta";
import { angularSignalsStandaloneComponentsLesson } from "@/domains/topics/content/frontend/angular/angular-signals-standalone-components/meta";
import { reactFundamentalsLesson } from "@/domains/topics/content/frontend/react/fundamentals/meta";
import { reactHooksInDepthLesson } from "@/domains/topics/content/frontend/react/hooks-in-depth/meta";
import { reactRenderingBehaviorLesson } from "@/domains/topics/content/frontend/react/rendering-behavior/meta";
import { reactStateManagementLesson } from "@/domains/topics/content/frontend/react/state-management/meta";
import { reactComponentDesignLesson } from "@/domains/topics/content/frontend/react/component-design/meta";
import { reactPerformanceLesson } from "@/domains/topics/content/frontend/react/performance/meta";
import { reactEffectsLesson } from "@/domains/topics/content/frontend/react/effects-and-side-effects/meta";
import { reactFormsLesson } from "@/domains/topics/content/frontend/react/forms/meta";
import { reactDataFetchingLesson } from "@/domains/topics/content/frontend/react/data-fetching/meta";
import { reactRoutingLesson } from "@/domains/topics/content/frontend/react/routing/meta";
import { reactServerRenderingLesson } from "@/domains/topics/content/frontend/react/server-rendering/meta";
import { reactArchitectureLesson } from "@/domains/topics/content/frontend/react/architecture/meta";
import { reactErrorHandlingLesson } from "@/domains/topics/content/frontend/react/error-handling/meta";
import { nextJsRenderingModelLesson } from "@/domains/topics/content/frontend/next-js/rendering-model/meta";
import { nextJsAppRouterArchitectureLesson } from "@/domains/topics/content/frontend/next-js/app-router-architecture/meta";
import { nextJsServerVsClientComponentsLesson } from "@/domains/topics/content/frontend/next-js/server-vs-client-components/meta";
import { nextJsDataFetchingLesson } from "@/domains/topics/content/frontend/next-js/data-fetching/meta";
import { nextJsCachingAndRevalidationLesson } from "@/domains/topics/content/frontend/next-js/caching-and-revalidation/meta";
import { nextJsServerActionsMutationsLesson } from "@/domains/topics/content/frontend/next-js/server-actions-mutations/meta";
import { nextJsRoutingLesson } from "@/domains/topics/content/frontend/next-js/routing/meta";
import { nextJsApiRouteHandlersLesson } from "@/domains/topics/content/frontend/next-js/api-route-handlers/meta";
import { nextJsMiddlewareEdgeRuntimeLesson } from "@/domains/topics/content/frontend/next-js/middleware-edge-runtime/meta";
import { nextJsPerformanceLesson } from "@/domains/topics/content/frontend/next-js/performance/meta";
import { nextJsSeoMetadataLesson } from "@/domains/topics/content/frontend/next-js/seo-metadata/meta";
import { nextJsAuthenticationAuthorizationLesson } from "@/domains/topics/content/frontend/next-js/authentication-authorization/meta";
import { nextJsErrorHandlingObservabilityLesson } from "@/domains/topics/content/frontend/next-js/error-handling-observability/meta";
import { nextJsDeploymentRuntimeTradeoffsLesson } from "@/domains/topics/content/frontend/next-js/deployment-runtime-tradeoffs/meta";
import { nextJsPagesRouterLegacyLesson } from "@/domains/topics/content/frontend/next-js/pages-router-legacy/meta";
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

    expect(reflowRepaintLesson.id).toBe("reflow-repaint");
    expect(reflowRepaintLesson.title.length).toBeGreaterThan(0);
    expect(reflowRepaintLesson.summary.length).toBeGreaterThan(0);
    expect(reflowRepaintLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

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

    for (const lesson of typeScriptTopicLessons) {
      expect(lesson.id.startsWith("typescript-")).toBe(true);
      expect(lesson.title.length).toBeGreaterThan(0);
      expect(lesson.summary.length).toBeGreaterThan(0);
      expect(lesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);
    }

    expect(unitTestingLesson.id).toBe("unit-testing");
    expect(unitTestingLesson.title.length).toBeGreaterThan(0);
    expect(unitTestingLesson.summary.length).toBeGreaterThan(0);
    expect(unitTestingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(integrationTestingLesson.id).toBe("integration-testing");
    expect(integrationTestingLesson.title.length).toBeGreaterThan(0);
    expect(integrationTestingLesson.summary.length).toBeGreaterThan(0);
    expect(integrationTestingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(e2eTestingLesson.id).toBe("e2e-testing");
    expect(e2eTestingLesson.title.length).toBeGreaterThan(0);
    expect(e2eTestingLesson.summary.length).toBeGreaterThan(0);
    expect(e2eTestingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(codeSplittingLesson.id).toBe("code-splitting");
    expect(codeSplittingLesson.title.length).toBeGreaterThan(0);
    expect(codeSplittingLesson.summary.length).toBeGreaterThan(0);
    expect(codeSplittingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(treeShakingLesson.id).toBe("tree-shaking");
    expect(treeShakingLesson.title.length).toBeGreaterThan(0);
    expect(treeShakingLesson.summary.length).toBeGreaterThan(0);
    expect(treeShakingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(cachingStrategiesLesson.id).toBe("caching-strategies");
    expect(cachingStrategiesLesson.title.length).toBeGreaterThan(0);
    expect(cachingStrategiesLesson.summary.length).toBeGreaterThan(0);
    expect(cachingStrategiesLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(coreWebVitalsLesson.id).toBe("core-web-vitals");
    expect(coreWebVitalsLesson.title.length).toBeGreaterThan(0);
    expect(coreWebVitalsLesson.summary.length).toBeGreaterThan(0);
    expect(coreWebVitalsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(webpackViteLesson.id).toBe("webpack-vite");
    expect(webpackViteLesson.title.length).toBeGreaterThan(0);
    expect(webpackViteLesson.summary.length).toBeGreaterThan(0);
    expect(webpackViteLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(babelTypeScriptLesson.id).toBe("babel-typescript");
    expect(babelTypeScriptLesson.title.length).toBeGreaterThan(0);
    expect(babelTypeScriptLesson.summary.length).toBeGreaterThan(0);
    expect(babelTypeScriptLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(cicdBasicsLesson.id).toBe("cicd-basics");
    expect(cicdBasicsLesson.title.length).toBeGreaterThan(0);
    expect(cicdBasicsLesson.summary.length).toBeGreaterThan(0);
    expect(cicdBasicsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularArchitectureLesson.id).toBe("angular-architecture");
    expect(angularArchitectureLesson.title.length).toBeGreaterThan(0);
    expect(angularArchitectureLesson.summary.length).toBeGreaterThan(0);
    expect(angularArchitectureLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularComponentsTemplatesDataBindingLesson.id).toBe("angular-components-templates-data-binding");
    expect(angularComponentsTemplatesDataBindingLesson.title.length).toBeGreaterThan(0);
    expect(angularComponentsTemplatesDataBindingLesson.summary.length).toBeGreaterThan(0);
    expect(angularComponentsTemplatesDataBindingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularDirectivesLesson.id).toBe("angular-directives");
    expect(angularDirectivesLesson.title.length).toBeGreaterThan(0);
    expect(angularDirectivesLesson.summary.length).toBeGreaterThan(0);
    expect(angularDirectivesLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularInputsOutputsComponentCommunicationLesson.id).toBe("angular-inputs-outputs-component-communication");
    expect(angularInputsOutputsComponentCommunicationLesson.title.length).toBeGreaterThan(0);
    expect(angularInputsOutputsComponentCommunicationLesson.summary.length).toBeGreaterThan(0);
    expect(angularInputsOutputsComponentCommunicationLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularLifecycleHooksLesson.id).toBe("angular-lifecycle-hooks");
    expect(angularLifecycleHooksLesson.title.length).toBeGreaterThan(0);
    expect(angularLifecycleHooksLesson.summary.length).toBeGreaterThan(0);
    expect(angularLifecycleHooksLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularDependencyInjectionLesson.id).toBe("angular-dependency-injection");
    expect(angularDependencyInjectionLesson.title.length).toBeGreaterThan(0);
    expect(angularDependencyInjectionLesson.summary.length).toBeGreaterThan(0);
    expect(angularDependencyInjectionLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularServicesLesson.id).toBe("angular-services");
    expect(angularServicesLesson.title.length).toBeGreaterThan(0);
    expect(angularServicesLesson.summary.length).toBeGreaterThan(0);
    expect(angularServicesLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularRxjsBasicsLesson.id).toBe("angular-rxjs-basics");
    expect(angularRxjsBasicsLesson.title.length).toBeGreaterThan(0);
    expect(angularRxjsBasicsLesson.summary.length).toBeGreaterThan(0);
    expect(angularRxjsBasicsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularHttpClientLesson.id).toBe("angular-http-client");
    expect(angularHttpClientLesson.title.length).toBeGreaterThan(0);
    expect(angularHttpClientLesson.summary.length).toBeGreaterThan(0);
    expect(angularHttpClientLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularRoutingLesson.id).toBe("angular-routing");
    expect(angularRoutingLesson.title.length).toBeGreaterThan(0);
    expect(angularRoutingLesson.summary.length).toBeGreaterThan(0);
    expect(angularRoutingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularReactiveFormsValidationLesson.id).toBe("angular-reactive-forms-validation");
    expect(angularReactiveFormsValidationLesson.title.length).toBeGreaterThan(0);
    expect(angularReactiveFormsValidationLesson.summary.length).toBeGreaterThan(0);
    expect(angularReactiveFormsValidationLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularChangeDetectionLesson.id).toBe("angular-change-detection");
    expect(angularChangeDetectionLesson.title.length).toBeGreaterThan(0);
    expect(angularChangeDetectionLesson.summary.length).toBeGreaterThan(0);
    expect(angularChangeDetectionLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularInterceptorsLesson.id).toBe("angular-interceptors");
    expect(angularInterceptorsLesson.title.length).toBeGreaterThan(0);
    expect(angularInterceptorsLesson.summary.length).toBeGreaterThan(0);
    expect(angularInterceptorsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(angularSignalsStandaloneComponentsLesson.id).toBe("angular-signals-standalone-components");
    expect(angularSignalsStandaloneComponentsLesson.title.length).toBeGreaterThan(0);
    expect(angularSignalsStandaloneComponentsLesson.summary.length).toBeGreaterThan(0);
    expect(angularSignalsStandaloneComponentsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactFundamentalsLesson.id).toBe("react-fundamentals");
    expect(reactFundamentalsLesson.title.length).toBeGreaterThan(0);
    expect(reactFundamentalsLesson.summary.length).toBeGreaterThan(0);
    expect(reactFundamentalsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactHooksInDepthLesson.id).toBe("react-hooks-in-depth");
    expect(reactHooksInDepthLesson.title.length).toBeGreaterThan(0);
    expect(reactHooksInDepthLesson.summary.length).toBeGreaterThan(0);
    expect(reactHooksInDepthLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactRenderingBehaviorLesson.id).toBe("react-rendering-behavior");
    expect(reactRenderingBehaviorLesson.title.length).toBeGreaterThan(0);
    expect(reactRenderingBehaviorLesson.summary.length).toBeGreaterThan(0);
    expect(reactRenderingBehaviorLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactStateManagementLesson.id).toBe("react-state-management");
    expect(reactStateManagementLesson.title.length).toBeGreaterThan(0);
    expect(reactStateManagementLesson.summary.length).toBeGreaterThan(0);
    expect(reactStateManagementLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactComponentDesignLesson.id).toBe("react-component-design");
    expect(reactComponentDesignLesson.title.length).toBeGreaterThan(0);
    expect(reactComponentDesignLesson.summary.length).toBeGreaterThan(0);
    expect(reactComponentDesignLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactPerformanceLesson.id).toBe("react-performance");
    expect(reactPerformanceLesson.title.length).toBeGreaterThan(0);
    expect(reactPerformanceLesson.summary.length).toBeGreaterThan(0);
    expect(reactPerformanceLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactEffectsLesson.id).toBe("react-effects-and-side-effects");
    expect(reactEffectsLesson.title.length).toBeGreaterThan(0);
    expect(reactEffectsLesson.summary.length).toBeGreaterThan(0);
    expect(reactEffectsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactFormsLesson.id).toBe("react-forms");
    expect(reactFormsLesson.title.length).toBeGreaterThan(0);
    expect(reactFormsLesson.summary.length).toBeGreaterThan(0);
    expect(reactFormsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactDataFetchingLesson.id).toBe("react-data-fetching");
    expect(reactDataFetchingLesson.title.length).toBeGreaterThan(0);
    expect(reactDataFetchingLesson.summary.length).toBeGreaterThan(0);
    expect(reactDataFetchingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactRoutingLesson.id).toBe("react-routing");
    expect(reactRoutingLesson.title.length).toBeGreaterThan(0);
    expect(reactRoutingLesson.summary.length).toBeGreaterThan(0);
    expect(reactRoutingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactServerRenderingLesson.id).toBe("react-server-rendering");
    expect(reactServerRenderingLesson.title.length).toBeGreaterThan(0);
    expect(reactServerRenderingLesson.summary.length).toBeGreaterThan(0);
    expect(reactServerRenderingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactArchitectureLesson.id).toBe("react-architecture");
    expect(reactArchitectureLesson.title.length).toBeGreaterThan(0);
    expect(reactArchitectureLesson.summary.length).toBeGreaterThan(0);
    expect(reactArchitectureLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(reactErrorHandlingLesson.id).toBe("react-error-handling");
    expect(reactErrorHandlingLesson.title.length).toBeGreaterThan(0);
    expect(reactErrorHandlingLesson.summary.length).toBeGreaterThan(0);
    expect(reactErrorHandlingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsRenderingModelLesson.id).toBe("nextjs-rendering-model");
    expect(nextJsRenderingModelLesson.title.length).toBeGreaterThan(0);
    expect(nextJsRenderingModelLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsRenderingModelLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsAppRouterArchitectureLesson.id).toBe("nextjs-app-router-architecture");
    expect(nextJsAppRouterArchitectureLesson.title.length).toBeGreaterThan(0);
    expect(nextJsAppRouterArchitectureLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsAppRouterArchitectureLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsServerVsClientComponentsLesson.id).toBe("nextjs-server-vs-client-components");
    expect(nextJsServerVsClientComponentsLesson.title.length).toBeGreaterThan(0);
    expect(nextJsServerVsClientComponentsLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsServerVsClientComponentsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsDataFetchingLesson.id).toBe("nextjs-data-fetching");
    expect(nextJsDataFetchingLesson.title.length).toBeGreaterThan(0);
    expect(nextJsDataFetchingLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsDataFetchingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsCachingAndRevalidationLesson.id).toBe("nextjs-caching-and-revalidation");
    expect(nextJsCachingAndRevalidationLesson.title.length).toBeGreaterThan(0);
    expect(nextJsCachingAndRevalidationLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsCachingAndRevalidationLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsServerActionsMutationsLesson.id).toBe("nextjs-server-actions-mutations");
    expect(nextJsServerActionsMutationsLesson.title.length).toBeGreaterThan(0);
    expect(nextJsServerActionsMutationsLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsServerActionsMutationsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsRoutingLesson.id).toBe("nextjs-routing");
    expect(nextJsRoutingLesson.title.length).toBeGreaterThan(0);
    expect(nextJsRoutingLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsRoutingLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsApiRouteHandlersLesson.id).toBe("nextjs-api-route-handlers");
    expect(nextJsApiRouteHandlersLesson.title.length).toBeGreaterThan(0);
    expect(nextJsApiRouteHandlersLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsApiRouteHandlersLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsMiddlewareEdgeRuntimeLesson.id).toBe("nextjs-middleware-edge-runtime");
    expect(nextJsMiddlewareEdgeRuntimeLesson.title.length).toBeGreaterThan(0);
    expect(nextJsMiddlewareEdgeRuntimeLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsMiddlewareEdgeRuntimeLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsPerformanceLesson.id).toBe("nextjs-performance");
    expect(nextJsPerformanceLesson.title.length).toBeGreaterThan(0);
    expect(nextJsPerformanceLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsPerformanceLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsSeoMetadataLesson.id).toBe("nextjs-seo-metadata");
    expect(nextJsSeoMetadataLesson.title.length).toBeGreaterThan(0);
    expect(nextJsSeoMetadataLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsSeoMetadataLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsAuthenticationAuthorizationLesson.id).toBe("nextjs-authentication-authorization");
    expect(nextJsAuthenticationAuthorizationLesson.title.length).toBeGreaterThan(0);
    expect(nextJsAuthenticationAuthorizationLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsAuthenticationAuthorizationLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsErrorHandlingObservabilityLesson.id).toBe("nextjs-error-handling-observability");
    expect(nextJsErrorHandlingObservabilityLesson.title.length).toBeGreaterThan(0);
    expect(nextJsErrorHandlingObservabilityLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsErrorHandlingObservabilityLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsDeploymentRuntimeTradeoffsLesson.id).toBe("nextjs-deployment-runtime-tradeoffs");
    expect(nextJsDeploymentRuntimeTradeoffsLesson.title.length).toBeGreaterThan(0);
    expect(nextJsDeploymentRuntimeTradeoffsLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsDeploymentRuntimeTradeoffsLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

    expect(nextJsPagesRouterLegacyLesson.id).toBe("nextjs-pages-router-legacy");
    expect(nextJsPagesRouterLegacyLesson.title.length).toBeGreaterThan(0);
    expect(nextJsPagesRouterLegacyLesson.summary.length).toBeGreaterThan(0);
    expect(nextJsPagesRouterLegacyLesson.relatedTopicIds?.every((topicId) => topicIds.has(topicId))).toBe(true);

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

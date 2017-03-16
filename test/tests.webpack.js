// This file is an entry point for angular tests

var testsContext = require.context(".", true, /.spec$/);
testsContext.keys().forEach(testsContext);
let pyodide = null;

export async function initPyodide() {
  if (!pyodide) {
    pyodide = await window.loadPyodide();
    // Load standard Python packages if needed
    await pyodide.loadPackagesFromImports("import sys");
  }
  return pyodide;
}

export async function runPython(code) {
  try {
    const pyodide = await initPyodide();

    // Redirect stdout and stderr
    const stdout = [];
    const stderr = [];

    pyodide.setStdout({
      batched: (msg) => stdout.push(msg),
    });
    pyodide.setStderr({
      batched: (msg) => stderr.push(msg),
    });

    await pyodide.runPythonAsync(code);

    return {
      output: stdout.join(""),
      error: stderr.join(""),
    };

  } catch (err) {
    return { error: err.message };
  }
}

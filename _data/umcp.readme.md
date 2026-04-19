# 🐚 MicroMCP

A lightweight, zero-overhead implementation of [Model Context Protocol (MCP)](https://modelcontextprotocol.io) in pure Python inspired by the original `bash` implementation by Muthukumaran Navaneethakrishnan.

**Why?** I found the idea of using the simplest possible implementation of MCP in a shell script fascinating, but I wanted to see how it would look in Python with true introspection capabilities.

---

## 📋 Features

- ✅ Full JSON-RPC 2.0 protocol over stdio
- ✅ Complete MCP protocol implementation
- ✅ Dynamic tool discovery via function naming convention
- ✅ Complete introspection of function signatures
- ✅ Easy to extend with custom tools
- ✅ Prompt templates for reusable, structured interactions
- ✅ Both synchronous and asynchronous implementations
- ✅ Zero third-party dependencies

---

## 🔧 Requirements

- Python 3.7+

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/rcarmo/umcp
cd umcp
```

2. **Verify installation**

```bash
python movie_server.py --help
```

No additional packages required - MicroMCP uses only the Python standard library!

---

## 🚀 Quick Start

### 1. Try the Example Server

```bash
echo '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "get_movies"}, "id": 1}' | python ./movie_server.py
```

### 2. List Available Tools

```bash
echo '{"jsonrpc": "2.0", "method": "tools/list", "id": 1}' | python ./movie_server.py
```

### 3. Try the Calculator

```bash
echo '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "add", "arguments": {"a": 5, "b": 3}}, "id": 1}' | python ./calculator_server.py
```

---

## 🏗️ Architecture

```diagram
┌─────────────┐         ┌───────────────┐
│ MCP Host    │         │ MCP Server    │
│ (AI System) │◄──────► │ (myserver.py) │
└─────────────┘ stdio   └───────────────┘
                                │
                      ┌─────────┴──────────┐────────────────────┐
                      ▼                    ▼                    ▼
              ┌────────────────┐  ┌────────────────┐  ┌────────────────────┐
              │ Protocol Layer │  │ Business Logic │  │ Prompt Templates   │
              │ (umcp.py)      │  │(tool_* methods)│  │ (prompt_* methods) │
              └────────────────┘  └────────────────┘  └────────────────────┘
                      │                    │
                      ▼                    ▼
              ┌───────────────┐    ┌───────────────┐
              │ Introspection │    │ External      │
              └───────────────┘    │ Services/APIs │
                                   └───────────────┘
```

---

## 🎯 Getting Started Tutorial

### Creating Your First MCP Server

Create a file `my_server.py`:

```python
#!/usr/bin/env python3
from umcp import MCPServer
from typing import Dict, Any, Optional

class MyServer(MCPServer):
    """A simple example MCP server."""

    def tool_greet(self, name: str = "World") -> str:
        """Greet someone by name.

        Args:
            name: The name to greet

        Returns:
            A friendly greeting message
        """
        return f"Hello, {name}!"

    def tool_add_numbers(self, a: float, b: float) -> float:
        """Add two numbers together.

        Args:
            a: First number
            b: Second number

        Returns:
            The sum of the two numbers
        """
        return a + b

if __name__ == "__main__":
    server = MyServer()
    server.run()
```

### Testing Your Server

```bash
# Make it executable
chmod +x my_server.py

# Test the greet tool
echo '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "greet", "arguments": {"name": "Alice"}}, "id": 1}' | ./my_server.py

# Test the add tool
echo '{"jsonrpc": "2.0", "method": "tools/call", "params": {"name": "add_numbers", "arguments": {"a": 10, "b": 5}}, "id": 2}' | ./my_server.py
```

### Async Version

Create `async_server.py`:

```python
#!/usr/bin/env python3
import asyncio
from aioumcp import AsyncMCPServer

class AsyncMyServer(AsyncMCPServer):
    """An async example MCP server."""

    async def tool_fetch_data(self, url: str) -> Dict[str, Any]:
        """Simulate fetching data from a URL.

        Args:
            url: The URL to fetch from

        Returns:
            Mock data response
        """
        await asyncio.sleep(0.1)  # Simulate network delay
        return {"url": url, "status": "success", "data": "mock response"}

if __name__ == "__main__":
    server = AsyncMyServer()
    server.run()
```

---

## 🔌 Examples

This implementation includes two example servers that demonstrate how to use the MCP protocol:

### Movie Booking Server (`movie_server.py`)

- Demonstrates CRUD operations
- Shows parameter validation
- Includes prompt templates for movie-related tasks

### Calculator Server (`calculator_server.py`)

- Simple mathematical operations
- Error handling for edge cases
- Type-safe parameter handling

Both are supplied in synchronous and asynchronous versions, showcasing how to implement tools and introspection.

### Running the Examples

```bash
# Synchronous versions
python movie_server.py
python calculator_server.py

# Asynchronous versions
python async_movie_server.py
python async_calculator_server.py
```

---

## 📝 Prompt Templates

MicroMCP supports reusable prompt templates using a simple naming convention. See [PROMPTS.md](PROMPTS.md) for detailed documentation.

### Quick Overview

- Any method named `prompt_<name>` is treated as a prompt definition
- The method docstring becomes the prompt description
- Function signature is introspected for JSON Schema input definition
- Optional categories can be embedded in the docstring

### Simple Example

```python
class MyServer(MCPServer):
    def prompt_code_review(self, filename: str, issues: int = 0) -> str:
        """Generate a focused code review instruction.\nCategories: code, review"""
        return f"Please review '{filename}'. Assume ~{issues} pre-identified issues."
```

### Testing Prompts

```bash
# List available prompts
echo '{"jsonrpc": "2.0", "method": "prompts/list", "id": 1}' | python ./movie_server.py

# Get a specific prompt
echo '{"jsonrpc": "2.0", "method": "prompts/get", "params": {"name": "code_review", "arguments": {"filename": "main.py"}}, "id": 2}' | python ./movie_server.py
```

---

## 📚 API Reference

### Core Classes

#### `MCPServer`

Base class for synchronous MCP servers.

**Key Methods:**

- `discover_tools()` - Automatically finds all `tool_*` methods
- `discover_prompts()` - Automatically finds all `prompt_*` methods
- `handle_tools_call()` - Dispatches tool execution
- `handle_prompt_get()` - Handles prompt template retrieval

#### `AsyncMCPServer`

Base class for asynchronous MCP servers.

**Key Methods:**

- `discover_tools()` - Automatically finds all `tool_*` methods
- `discover_prompts()` - Automatically finds all `prompt_*` methods
- `handle_tools_call()` - Dispatches tool execution (async)
- `handle_prompt_get()` - Handles prompt template retrieval (async)

### Tool Method Signature

```python
def tool_<name>(self, param1: type1, param2: type2 = default) -> return_type:
    """Tool description (first line becomes summary).

    Args:
        param1: Description of parameter 1
        param2: Description of paramet

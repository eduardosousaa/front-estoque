(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/(estoque)/estoque/inicio/inicio.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "botaoAcao": "inicio-module__uApqwW__botaoAcao",
  "botaoLimpar": "inicio-module__uApqwW__botaoLimpar",
  "botaoMais": "inicio-module__uApqwW__botaoMais",
  "botaoPesquisar": "inicio-module__uApqwW__botaoPesquisar",
  "categoriaFiltro": "inicio-module__uApqwW__categoriaFiltro",
  "container": "inicio-module__uApqwW__container",
  "estadoVazio": "inicio-module__uApqwW__estadoVazio",
  "filtros": "inicio-module__uApqwW__filtros",
  "header": "inicio-module__uApqwW__header",
  "headerAcoes": "inicio-module__uApqwW__headerAcoes",
  "header_button": "inicio-module__uApqwW__header_button",
  "header_buttons": "inicio-module__uApqwW__header_buttons",
  "header_h1": "inicio-module__uApqwW__header_h1",
  "iconeBusca": "inicio-module__uApqwW__iconeBusca",
  "iconeEmbalagem": "inicio-module__uApqwW__iconeEmbalagem",
  "inputWrapper": "inicio-module__uApqwW__inputWrapper",
  "itemProduto": "inicio-module__uApqwW__itemProduto",
  "listaProdutos": "inicio-module__uApqwW__listaProdutos",
  "navbar": "inicio-module__uApqwW__navbar",
  "navlink": "inicio-module__uApqwW__navlink",
  "resultado": "inicio-module__uApqwW__resultado",
  "textoAjuda": "inicio-module__uApqwW__textoAjuda",
  "titulo": "inicio-module__uApqwW__titulo",
});
}}),
"[project]/src/components/ElementsUI/InputForm.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>InputForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$FormGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormGroup$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/FormGroup.js [app-client] (ecmascript) <export default as FormGroup>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Label$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Label.js [app-client] (ecmascript) <export default as Label>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Input.js [app-client] (ecmascript) <export default as Input>");
;
;
function InputForm({ id, name, label, register, required, placeholder, onChange, type, options, errors }) {
    const { ref, ...registerField } = register(`${name}`, {
        required: required || false,
        onChange: onChange || null
    });
    function checkSubErrors() {
        if (errors) {
            if (name.includes(".") && !name.includes("[") && !name.includes("]")) {
                let splitArray = name.split(".");
                let object = errors;
                for(let x = 0; x < splitArray.length; x++){
                    for (const [key, value] of Object.entries(object)){
                        if (key == splitArray[x]) {
                            object = value;
                            if (x == splitArray.length - 1) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: "red",
                                                fontWeight: "300"
                                            },
                                            children: object.message || "Campo Obrigatório"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ElementsUI/InputForm.js",
                                            lineNumber: 22,
                                            columnNumber: 26
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/components/ElementsUI/InputForm.js",
                                            lineNumber: 22,
                                            columnNumber: 120
                                        }, this)
                                    ]
                                }, void 0, true);
                            }
                            break;
                        }
                    }
                }
            } else if (name.includes("[") && name.includes("]")) {
                let name1 = name.split("[")[0];
                let index = name.split("[")[1].split("]")[0];
                let name2 = name.split(".")[1];
                if (errors?.[name1]?.[index]?.[name2]) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: "red",
                                fontWeight: "300"
                            },
                            children: errors[name1][index][name2].message || "Campo Obrigatório"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ElementsUI/InputForm.js",
                            lineNumber: 34,
                            columnNumber: 20
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/src/components/ElementsUI/InputForm.js",
                            lineNumber: 34,
                            columnNumber: 135
                        }, this)
                    ]
                }, void 0, true);
            }
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$FormGroup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FormGroup$3e$__["FormGroup"], {
        style: {
            width: "100%"
        },
        children: [
            label ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Label$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Label$3e$__["Label"], {
                style: {
                    height: "25px",
                    fontSize: "18px"
                },
                for: id,
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/InputForm.js",
                lineNumber: 41,
                columnNumber: 16
            }, this) : null,
            type === "select" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                type: "select",
                id: id,
                name: name,
                innerRef: ref,
                ...registerField,
                style: {
                    height: "50px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: "",
                        children: "Selecione..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ElementsUI/InputForm.js",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    options.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: option.id,
                            children: option.name
                        }, option.id, false, {
                            fileName: "[project]/src/components/ElementsUI/InputForm.js",
                            lineNumber: 56,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ElementsUI/InputForm.js",
                lineNumber: 46,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                id: id,
                name: name,
                placeholder: placeholder,
                type: type,
                innerRef: ref,
                ...registerField,
                style: {
                    height: "50px"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/InputForm.js",
                lineNumber: 62,
                columnNumber: 9
            }, this),
            name.includes(".") || name.includes("[") && name.includes("]") ? checkSubErrors() : errors?.[name] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    color: "red",
                    fontWeight: "300"
                },
                children: errors[name].message || "Campo Obrigatório"
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/InputForm.js",
                lineNumber: 76,
                columnNumber: 27
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ElementsUI/InputForm.js",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_c = InputForm;
var _c;
__turbopack_context__.k.register(_c, "InputForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ElementsUI/TableStyle.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TableStyle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Table.js [app-client] (ecmascript) <export default as Table>");
;
;
function TableStyle({ columnNames, data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Table$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Table$3e$__["Table"], {
        striped: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                    style: {
                        fontSize: "1.2rem"
                    },
                    children: columnNames.map((name, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                            style: {
                                backgroundColor: "#009e8b",
                                color: "#fff",
                                ...index == 0 && {
                                    borderTopLeftRadius: "15px"
                                },
                                ...index == columnNames.length - 1 && {
                                    borderTopRightRadius: "15px"
                                }
                            },
                            children: name
                        }, index, false, {
                            fileName: "[project]/src/components/ElementsUI/TableStyle.js",
                            lineNumber: 10,
                            columnNumber: 20
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/ElementsUI/TableStyle.js",
                    lineNumber: 8,
                    columnNumber: 16
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/TableStyle.js",
                lineNumber: 7,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                children: data.map((e, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: Object.keys(e).map((prop, index2)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                style: {
                                    backgroundColor: "#ddffff",
                                    borderBottomWidth: 0,
                                    ...index == data.length - 1 && index2 == 0 && {
                                        borderBottomLeftRadius: "15px"
                                    },
                                    ...index == data.length - 1 && index2 == Object.keys(e).length - 1 && {
                                        borderBottomRightRadius: "15px"
                                    }
                                },
                                children: e[prop]
                            }, index2, false, {
                                fileName: "[project]/src/components/ElementsUI/TableStyle.js",
                                lineNumber: 19,
                                columnNumber: 24
                            }, this))
                    }, index, false, {
                        fileName: "[project]/src/components/ElementsUI/TableStyle.js",
                        lineNumber: 17,
                        columnNumber: 19
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/TableStyle.js",
                lineNumber: 15,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ElementsUI/TableStyle.js",
        lineNumber: 6,
        columnNumber: 9
    }, this);
}
_c = TableStyle;
var _c;
__turbopack_context__.k.register(_c, "TableStyle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ElementsUI/PaginationStyle.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PaginationStyle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Row$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Row.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Col.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Input.js [app-client] (ecmascript) <export default as Input>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Pagination.js [app-client] (ecmascript) <export default as Pagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationItem$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/PaginationItem.js [app-client] (ecmascript) <export default as PaginationItem>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationLink$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/PaginationLink.js [app-client] (ecmascript) <export default as PaginationLink>");
;
;
function PaginationStyle({ number, setNumber, size, setSize, pageElements, totalElements, totalPages }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Row$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
        className: "d-flex mt-3 mb-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                sm: "4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "d-flex bd-highlight",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: " px-2 bd-highlight",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Input$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Input$3e$__["Input"], {
                            type: "select",
                            bsSize: "sm",
                            defaultValue: size,
                            onChange: (e)=>setSize(e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: 5,
                                    children: "5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                    lineNumber: 13,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: 10,
                                    children: "10"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                    lineNumber: 14,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: 15,
                                    children: "15"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                    lineNumber: 15,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: 20,
                                    children: "20"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                    lineNumber: 16,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                            lineNumber: 10,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                        lineNumber: 9,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                    lineNumber: 8,
                    columnNumber: 14
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                lineNumber: 7,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                sm: "4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__["Pagination"], {
                    size: "sm",
                    style: {
                        gap: "2%",
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(255,255,255,0.92)",
                        borderRadius: "30px",
                        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.10)"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationItem$3e$__["PaginationItem"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationLink$3e$__["PaginationLink"], {
                                onClick: ()=>{
                                    setNumber(0);
                                },
                                style: {
                                    border: "none",
                                    color: "#6A6868"
                                },
                                first: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                lineNumber: 32,
                                columnNumber: 20
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                            lineNumber: 31,
                            columnNumber: 17
                        }, this),
                        number - 1 != -1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationItem$3e$__["PaginationItem"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationLink$3e$__["PaginationLink"], {
                                onClick: ()=>{
                                    setNumber(number - 1);
                                },
                                style: {
                                    border: "none",
                                    color: "#6A6868"
                                },
                                previous: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                lineNumber: 35,
                                columnNumber: 20
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                            lineNumber: 34,
                            columnNumber: 39
                        }, this),
                        [
                            ...Array(totalPages)
                        ].map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationItem$3e$__["PaginationItem"], {
                                active: index == number,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationLink$3e$__["PaginationLink"], {
                                    onClick: ()=>{
                                        setNumber(index);
                                    },
                                    style: {
                                        border: "none",
                                        color: "#6A6868",
                                        ...index == number && {
                                            backgroundColor: "#009e8b"
                                        }
                                    },
                                    children: index + 1
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                    lineNumber: 40,
                                    columnNumber: 20
                                }, this)
                            }, index, false, {
                                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                lineNumber: 39,
                                columnNumber: 17
                            }, this)),
                        number + 1 < totalPages && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationItem$3e$__["PaginationItem"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationLink$3e$__["PaginationLink"], {
                                onClick: ()=>{
                                    setNumber(number + 1);
                                },
                                style: {
                                    border: "none",
                                    color: "#6A6868"
                                },
                                next: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                lineNumber: 45,
                                columnNumber: 20
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                            lineNumber: 44,
                            columnNumber: 46
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationItem$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationItem$3e$__["PaginationItem"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$PaginationLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PaginationLink$3e$__["PaginationLink"], {
                                onClick: ()=>{
                                    setNumber(totalPages - 1);
                                },
                                style: {
                                    border: "none",
                                    color: "#6A6868"
                                },
                                last: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                                lineNumber: 48,
                                columnNumber: 20
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                            lineNumber: 47,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                    lineNumber: 23,
                    columnNumber: 15
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Exibindo ",
                        pageElements,
                        " de ",
                        totalElements,
                        " linha(s)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                    lineNumber: 54,
                    columnNumber: 14
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
                lineNumber: 53,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ElementsUI/PaginationStyle.js",
        lineNumber: 6,
        columnNumber: 9
    }, this);
}
_c = PaginationStyle;
var _c;
__turbopack_context__.k.register(_c, "PaginationStyle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(estoque)/estoque/inicio/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>HomePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/(estoque)/estoque/inicio/inicio.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Row$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Row.js [app-client] (ecmascript) <export default as Row>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Col.js [app-client] (ecmascript) <export default as Col>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Form$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Form.js [app-client] (ecmascript) <export default as Form>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/Button.js [app-client] (ecmascript) <export default as Button>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/CardHeader.js [app-client] (ecmascript) <export default as CardHeader>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$CardBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardBody$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/CardBody.js [app-client] (ecmascript) <export default as CardBody>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$CardFooter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardFooter$3e$__ = __turbopack_context__.i("[project]/node_modules/reactstrap/esm/CardFooter.js [app-client] (ecmascript) <export default as CardFooter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa6/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ElementsUI$2f$InputForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ElementsUI/InputForm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ElementsUI$2f$TableStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ElementsUI/TableStyle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ElementsUI$2f$PaginationStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ElementsUI/PaginationStyle.js [app-client] (ecmascript)");
/* IMPORTANTE: a variavel da url da api e a biblioteca de onde vem os cookies */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Constantes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/Constantes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nookies/dist/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function HomePage() {
    _s();
    /* IMPORTANTE: Aqui Salvo como cookie está o token2, da conta que vc recebe os dados   */ const { "token2": token2 } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nookies$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCookies"])();
    const { register, handleSubmit, setError, clearErrors, control, setValue, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        defaultValues: {
            name: '',
            categoryId: ''
        }
    });
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [busca, setBusca] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tipoSelecionado, setTipoSelecionado] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [produtos, setProdutos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categorias, setCategorias] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [requestError, setRequestError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [number, setNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [size, setSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(5);
    const [totalElements, setTotalElements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [totalPages, setTotalPages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const fetchProdutos = async (page = 0, pageSize = 5, filters = {})=>{
        setLoading(true);
        setRequestError('');
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                size: pageSize.toString()
            });
            if (filters.name && filters.name.trim()) {
                params.append('name', filters.name.trim());
            }
            if (filters.categoryId && filters.categoryId.trim()) {
                params.append('categoryId', filters.categoryId.trim());
            }
            // REMOVEMOS O BLOCO 'fetch = async () => { ... }' INCORRETO
            // E DESCOMENTAMOS O FETCH ORIGINAL, GARANTINDO QUE 'response' SEJA DEFINIDO.
            const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Constantes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].url + `product?${params}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    /* IMPORTANTE: Aqui vai no authentication o token2 e o modulo que vc vai utilizar o de estoque(STOCK) */ "Authorization": "Bearer " + token2,
                    "Module": "STOCK"
                }
            });
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            if (data.content) {
                setProdutos(data.content);
                setTotalElements(data.totalElements || 0);
                setTotalPages(data.totalPages || 0);
            } else if (Array.isArray(data)) {
                setProdutos(data);
                setTotalElements(data.length);
                setTotalPages(Math.ceil(data.length / pageSize));
            } else {
                setProdutos([]);
                setTotalElements(0);
                setTotalPages(0);
            }
        } catch (err) {
            console.error('Erro ao buscar produtos:', err);
            setRequestError('Erro ao carregar produtos. Tente novamente.');
            setProdutos([]);
            setTotalElements(0);
            setTotalPages(0);
        } finally{
            setLoading(false);
        }
    };
    const fetchCategorias = async ()=>{
        try {
            // SUBSTITUÍMOS 'API_BASE_URL' por 'Constantes.url' E ADICIONAMOS OS CABEÇALHOS
            const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$Constantes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].url + `/category`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token2,
                    "Module": "STOCK"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setCategorias(Array.isArray(data) ? data : data.content || []);
            }
        } catch (err) {
            console.error('Erro ao buscar categorias:', err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            fetchProdutos(0, size);
            fetchCategorias();
        }
    }["HomePage.useEffect"], []);
    const onSubmit = (data)=>{
        const filters = {
            name: busca,
            categoryId: tipoSelecionado
        };
        setNumber(0);
        fetchProdutos(0, size, filters);
    };
    const limpar = ()=>{
        setBusca('');
        setTipoSelecionado('');
        setValue('name', '');
        setValue('categoryId', '');
        setNumber(0);
        fetchProdutos(0, size);
    };
    const handlePageChange = (newPage)=>{
        setNumber(newPage);
        const filters = {
            name: busca,
            categoryId: tipoSelecionado
        };
        fetchProdutos(newPage, size, filters);
    };
    const handleSizeChange = (newSize)=>{
        setSize(newSize);
        setNumber(0);
        const filters = {
            name: busca,
            categoryId: tipoSelecionado
        };
        fetchProdutos(0, newSize, filters);
    };
    const categoriasOptions = categorias.map((cat)=>({
            value: cat.id,
            label: cat.name || cat.nome || cat.description
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$CardHeader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardHeader$3e$__["CardHeader"], {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header_h1,
                        children: "Produtos"
                    }, void 0, false, {
                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header_buttons,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header_button,
                                onClick: ()=>router.push("/estoque/inicio/adicionar_produto"),
                                children: [
                                    "Adicionar Produto ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPlus"], {}, void 0, false, {
                                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                        lineNumber: 193,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header_button,
                                onClick: ()=>router.push("/estoque/inicio/adicionar_tipo_produto"),
                                children: [
                                    "Adicionar Tipo de Produto ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa6$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPlus"], {}, void 0, false, {
                                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                        lineNumber: 200,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$CardBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardBody$3e$__["CardBody"], {
                style: {
                    width: "90%"
                },
                children: [
                    requestError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "alert alert-danger",
                        role: "alert",
                        children: requestError
                    }, void 0, false, {
                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                        lineNumber: 207,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Form$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Form$3e$__["Form"], {
                        onSubmit: handleSubmit(onSubmit),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Row$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                className: "d-flex mt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        sm: "8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputWrapper,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiSearch"], {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f28$estoque$292f$estoque$2f$inicio$2f$inicio$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconeBusca
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                                    lineNumber: 216,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "Buscar produtos por nome, código ou fornecedor...",
                                                    value: busca,
                                                    onChange: (e)=>setBusca(e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                                    lineNumber: 217,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                            lineNumber: 215,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                        lineNumber: 214,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Col$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Col$3e$__["Col"], {
                                        sm: "4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ElementsUI$2f$InputForm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            id: "categoryId",
                                            name: "categoryId",
                                            label: "",
                                            placeholder: "--Todas as categorias--",
                                            type: "select",
                                            register: register,
                                            options: categoriasOptions,
                                            value: tipoSelecionado,
                                            onChange: (e)=>setTipoSelecionado(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Row$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Row$3e$__["Row"], {
                                style: {
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        type: "submit",
                                        style: {
                                            backgroundColor: "#009E8B",
                                            width: "20%",
                                            marginRight: "10px"
                                        },
                                        disabled: loading,
                                        children: [
                                            loading ? 'Pesquisando...' : 'Pesquisar',
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiSearch"], {}, void 0, false, {
                                                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                                lineNumber: 246,
                                                columnNumber: 58
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Button$3e$__["Button"], {
                                        type: "button",
                                        onClick: limpar,
                                        style: {
                                            backgroundColor: "#6c757d",
                                            width: "15%"
                                        },
                                        disabled: loading,
                                        children: "Limpar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                        lineNumber: 249,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$CardBody$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardBody$3e$__["CardBody"], {
                style: {
                    width: "90%"
                },
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "spinner-border",
                            role: "status",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Carregando..."
                            }, void 0, false, {
                                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                                lineNumber: 265,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                            lineNumber: 264,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Carregando produtos..."
                        }, void 0, false, {
                            fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                            lineNumber: 267,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                    lineNumber: 263,
                    columnNumber: 11
                }, this) : produtos.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ElementsUI$2f$TableStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    columnNames: [
                        "Id",
                        "Imagem",
                        "Nome",
                        "Tipo"
                    ],
                    data: produtos.map((produto)=>({
                            id: produto.id,
                            imagem: produto.image || produto.imagem || "",
                            nome: produto.name || produto.nome,
                            tipo: produto.category?.name || produto.categoria?.nome || produto.tipo || "N/A"
                        }))
                }, void 0, false, {
                    fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                    lineNumber: 270,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FiPackage"], {
                            size: 48,
                            className: "text-muted mb-3"
                        }, void 0, false, {
                            fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted",
                            children: "Nenhum produto encontrado"
                        }, void 0, false, {
                            fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                    lineNumber: 280,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$reactstrap$2f$esm$2f$CardFooter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardFooter$3e$__["CardFooter"], {
                style: {
                    width: "90%",
                    backgroundColor: "transparent"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ElementsUI$2f$PaginationStyle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    number: number,
                    setNumber: handlePageChange,
                    size: size,
                    setSize: handleSizeChange,
                    pageElements: produtos.length,
                    totalElements: totalElements,
                    totalPages: totalPages
                }, void 0, false, {
                    fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                    lineNumber: 288,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(estoque)/estoque/inicio/page.js",
                lineNumber: 287,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(HomePage, "3ZFzQvInsOg4ga5MqdzqibC0VXU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_b817fe35._.js.map
/*!
 * ONNX Runtime Web v1.21.0-dev.20250114-228dd16893
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */ var Un = Object.defineProperty;
var Vp = Object.getOwnPropertyDescriptor;
var Wp = Object.getOwnPropertyNames;
var Lp = Object.prototype.hasOwnProperty;
var Nn = ((e1)=>typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e1, {
        get: (t, r)=>(typeof require < "u" ? require : t)[r]
    }) : e1)(function(e1) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + e1 + '" is not supported');
});
var U = (e1, t)=>()=>(e1 && (t = e1(e1 = 0)), t);
var Ft = (e1, t)=>{
    for(var r in t)Un(e1, r, {
        get: t[r],
        enumerable: !0
    });
}, Gp = (e1, t, r, n)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let o of Wp(t))!Lp.call(e1, o) && o !== r && Un(e1, o, {
        get: ()=>t[o],
        enumerable: !(n = Vp(t, o)) || n.enumerable
    });
    return e1;
};
var br = (e1)=>Gp(Un({}, "__esModule", {
        value: !0
    }), e1);
var yr, xt, St, Hp, Ji, Vn = U(()=>{
    "use strict";
    yr = new Map, xt = [], St = (e1, t, r)=>{
        if (t && typeof t.init == "function" && typeof t.createInferenceSessionHandler == "function") {
            let n = yr.get(e1);
            if (n === void 0) yr.set(e1, {
                backend: t,
                priority: r
            });
            else {
                if (n.priority > r) return;
                if (n.priority === r && n.backend !== t) throw new Error('cannot register backend "'.concat(e1, '" using priority ').concat(r));
            }
            if (r >= 0) {
                let o = xt.indexOf(e1);
                o !== -1 && xt.splice(o, 1);
                for(let i = 0; i < xt.length; i++)if (yr.get(xt[i]).priority <= r) {
                    xt.splice(i, 0, e1);
                    return;
                }
                xt.push(e1);
            }
            return;
        }
        throw new TypeError("not a valid backend");
    }, Hp = async (e1)=>{
        let t = yr.get(e1);
        if (!t) return "backend not found.";
        if (t.initialized) return t.backend;
        if (t.aborted) return t.error;
        {
            let r = !!t.initPromise;
            try {
                return r || (t.initPromise = t.backend.init(e1)), await t.initPromise, t.initialized = !0, t.backend;
            } catch (n) {
                return r || (t.error = "".concat(n), t.aborted = !0), t.error;
            } finally{
                delete t.initPromise;
            }
        }
    }, Ji = async (e1)=>{
        let t = e1.executionProviders || [], r = t.map((l)=>typeof l == "string" ? l : l.name), n = r.length === 0 ? xt : r, o, i = [], a = new Set;
        for (let l of n){
            let p = await Hp(l);
            typeof p == "string" ? i.push({
                name: l,
                err: p
            }) : (o || (o = p), o === p && a.add(l));
        }
        if (!o) throw new Error("no available backend found. ERR: ".concat(i.map((l)=>"[".concat(l.name, "] ").concat(l.err)).join(", ")));
        for (let { name: l, err: p } of i)r.includes(l) && console.warn('removing requested execution provider "'.concat(l, '" from session options because it is not available: ').concat(p));
        let d = t.filter((l)=>a.has(typeof l == "string" ? l : l.name));
        return [
            o,
            new Proxy(e1, {
                get: (l, p)=>p === "executionProviders" ? d : Reflect.get(l, p)
            })
        ];
    };
});
var ea = U(()=>{
    "use strict";
    Vn();
});
var ta, ra = U(()=>{
    "use strict";
    ta = "1.21.0-dev.20241212-1f88284f96";
});
var na, Re, Wn = U(()=>{
    "use strict";
    ra();
    na = "warning", Re = {
        wasm: {},
        webgl: {},
        webgpu: {},
        versions: {
            common: ta
        },
        set logLevel (e){
            if (e !== void 0) {
                if (typeof e != "string" || [
                    "verbose",
                    "info",
                    "warning",
                    "error",
                    "fatal"
                ].indexOf(e) === -1) throw new Error("Unsupported logging level: ".concat(e));
                na = e;
            }
        },
        get logLevel () {
            return na;
        }
    };
    Object.defineProperty(Re, "logLevel", {
        enumerable: !0
    });
});
var ve, oa = U(()=>{
    "use strict";
    Wn();
    ve = Re;
});
var ia, aa, sa = U(()=>{
    "use strict";
    ia = (e1, t)=>{
        let r = typeof document < "u" ? document.createElement("canvas") : new OffscreenCanvas(1, 1);
        r.width = e1.dims[3], r.height = e1.dims[2];
        let n = r.getContext("2d");
        if (n != null) {
            let o, i;
            (t === null || t === void 0 ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (o = e1.dims[2], i = e1.dims[3]) : (o = e1.dims[3], i = e1.dims[2]);
            let a = (t === null || t === void 0 ? void 0 : t.format) !== void 0 ? t.format : "RGB", d = t === null || t === void 0 ? void 0 : t.norm, l, p;
            d === void 0 || d.mean === void 0 ? l = [
                255,
                255,
                255,
                255
            ] : typeof d.mean == "number" ? l = [
                d.mean,
                d.mean,
                d.mean,
                d.mean
            ] : (l = [
                d.mean[0],
                d.mean[1],
                d.mean[2],
                0
            ], d.mean[3] !== void 0 && (l[3] = d.mean[3])), d === void 0 || d.bias === void 0 ? p = [
                0,
                0,
                0,
                0
            ] : typeof d.bias == "number" ? p = [
                d.bias,
                d.bias,
                d.bias,
                d.bias
            ] : (p = [
                d.bias[0],
                d.bias[1],
                d.bias[2],
                0
            ], d.bias[3] !== void 0 && (p[3] = d.bias[3]));
            let m = i * o, u = 0, h = m, _ = m * 2, y = -1;
            a === "RGBA" ? (u = 0, h = m, _ = m * 2, y = m * 3) : a === "RGB" ? (u = 0, h = m, _ = m * 2) : a === "RBG" && (u = 0, _ = m, h = m * 2);
            for(let g = 0; g < i; g++)for(let x = 0; x < o; x++){
                let $ = (e1.data[u++] - p[0]) * l[0], v = (e1.data[h++] - p[1]) * l[1], S = (e1.data[_++] - p[2]) * l[2], T = y === -1 ? 255 : (e1.data[y++] - p[3]) * l[3];
                n.fillStyle = "rgba(" + $ + "," + v + "," + S + "," + T + ")", n.fillRect(x, g, 1, 1);
            }
            if ("toDataURL" in r) return r.toDataURL();
            throw new Error("toDataURL is not supported");
        } else throw new Error("Can not access image data");
    }, aa = (e1, t)=>{
        let r = typeof document < "u" ? document.createElement("canvas").getContext("2d") : new OffscreenCanvas(1, 1).getContext("2d"), n;
        if (r != null) {
            let o, i, a;
            (t === null || t === void 0 ? void 0 : t.tensorLayout) !== void 0 && t.tensorLayout === "NHWC" ? (o = e1.dims[2], i = e1.dims[1], a = e1.dims[3]) : (o = e1.dims[3], i = e1.dims[2], a = e1.dims[1]);
            let d = t !== void 0 && t.format !== void 0 ? t.format : "RGB", l = t === null || t === void 0 ? void 0 : t.norm, p, m;
            l === void 0 || l.mean === void 0 ? p = [
                255,
                255,
                255,
                255
            ] : typeof l.mean == "number" ? p = [
                l.mean,
                l.mean,
                l.mean,
                l.mean
            ] : (p = [
                l.mean[0],
                l.mean[1],
                l.mean[2],
                255
            ], l.mean[3] !== void 0 && (p[3] = l.mean[3])), l === void 0 || l.bias === void 0 ? m = [
                0,
                0,
                0,
                0
            ] : typeof l.bias == "number" ? m = [
                l.bias,
                l.bias,
                l.bias,
                l.bias
            ] : (m = [
                l.bias[0],
                l.bias[1],
                l.bias[2],
                0
            ], l.bias[3] !== void 0 && (m[3] = l.bias[3]));
            let u = i * o;
            if (t !== void 0 && (t.format !== void 0 && a === 4 && t.format !== "RGBA" || a === 3 && t.format !== "RGB" && t.format !== "BGR")) throw new Error("Tensor format doesn't match input tensor dims");
            let h = 4, _ = 0, y = 1, g = 2, x = 3, $ = 0, v = u, S = u * 2, T = -1;
            d === "RGBA" ? ($ = 0, v = u, S = u * 2, T = u * 3) : d === "RGB" ? ($ = 0, v = u, S = u * 2) : d === "RBG" && ($ = 0, S = u, v = u * 2), n = r.createImageData(o, i);
            for(let A = 0; A < i * o; _ += h, y += h, g += h, x += h, A++)n.data[_] = (e1.data[$++] - m[0]) * p[0], n.data[y] = (e1.data[v++] - m[1]) * p[1], n.data[g] = (e1.data[S++] - m[2]) * p[2], n.data[x] = T === -1 ? 255 : (e1.data[T++] - m[3]) * p[3];
        } else throw new Error("Can not access image data");
        return n;
    };
});
var Ln, ua, da, la, ca, pa, ma = U(()=>{
    "use strict";
    _r();
    Ln = (e1, t)=>{
        if (e1 === void 0) throw new Error("Image buffer must be defined");
        if (t.height === void 0 || t.width === void 0) throw new Error("Image height and width must be defined");
        if (t.tensorLayout === "NHWC") throw new Error("NHWC Tensor layout is not supported yet");
        var _t_norm;
        let { height: r, width: n } = t, o = (_t_norm = t.norm) !== null && _t_norm !== void 0 ? _t_norm : {
            mean: 255,
            bias: 0
        }, i, a;
        var _o_mean_, _o_bias_;
        typeof o.mean == "number" ? i = [
            o.mean,
            o.mean,
            o.mean,
            o.mean
        ] : i = [
            o.mean[0],
            o.mean[1],
            o.mean[2],
            (_o_mean_ = o.mean[3]) !== null && _o_mean_ !== void 0 ? _o_mean_ : 255
        ], typeof o.bias == "number" ? a = [
            o.bias,
            o.bias,
            o.bias,
            o.bias
        ] : a = [
            o.bias[0],
            o.bias[1],
            o.bias[2],
            (_o_bias_ = o.bias[3]) !== null && _o_bias_ !== void 0 ? _o_bias_ : 0
        ];
        let d = t.format !== void 0 ? t.format : "RGBA", l = t.tensorFormat !== void 0 && t.tensorFormat !== void 0 ? t.tensorFormat : "RGB", p = r * n, m = l === "RGBA" ? new Float32Array(p * 4) : new Float32Array(p * 3), u = 4, h = 0, _ = 1, y = 2, g = 3, x = 0, $ = p, v = p * 2, S = -1;
        d === "RGB" && (u = 3, h = 0, _ = 1, y = 2, g = -1), l === "RGBA" ? S = p * 3 : l === "RBG" ? (x = 0, v = p, $ = p * 2) : l === "BGR" && (v = 0, $ = p, x = p * 2);
        for(let A = 0; A < p; A++, h += u, y += u, _ += u, g += u)m[x++] = (e1[h] + a[0]) / i[0], m[$++] = (e1[_] + a[1]) / i[1], m[v++] = (e1[y] + a[2]) / i[2], S !== -1 && g !== -1 && (m[S++] = (e1[g] + a[3]) / i[3]);
        return l === "RGBA" ? new ze("float32", m, [
            1,
            4,
            r,
            n
        ]) : new ze("float32", m, [
            1,
            3,
            r,
            n
        ]);
    }, ua = async (e1, t)=>{
        let r = typeof HTMLImageElement < "u" && e1 instanceof HTMLImageElement, n = typeof ImageData < "u" && e1 instanceof ImageData, o = typeof ImageBitmap < "u" && e1 instanceof ImageBitmap, i = typeof e1 == "string", a, d = t !== null && t !== void 0 ? t : {}, l = ()=>{
            if (typeof document < "u") return document.createElement("canvas");
            if (typeof OffscreenCanvas < "u") return new OffscreenCanvas(1, 1);
            throw new Error("Canvas is not supported");
        }, p = (m)=>typeof HTMLCanvasElement < "u" && m instanceof HTMLCanvasElement || m instanceof OffscreenCanvas ? m.getContext("2d") : null;
        if (r) {
            let m = l();
            m.width = e1.width, m.height = e1.height;
            let u = p(m);
            if (u != null) {
                let h = e1.height, _ = e1.width;
                if (t !== void 0 && t.resizedHeight !== void 0 && t.resizedWidth !== void 0 && (h = t.resizedHeight, _ = t.resizedWidth), t !== void 0) {
                    if (d = t, t.tensorFormat !== void 0) throw new Error("Image input config format must be RGBA for HTMLImageElement");
                    d.tensorFormat = "RGBA", d.height = h, d.width = _;
                } else d.tensorFormat = "RGBA", d.height = h, d.width = _;
                u.drawImage(e1, 0, 0), a = u.getImageData(0, 0, _, h).data;
            } else throw new Error("Can not access image data");
        } else if (n) {
            let m, u;
            if (t !== void 0 && t.resizedWidth !== void 0 && t.resizedHeight !== void 0 ? (m = t.resizedHeight, u = t.resizedWidth) : (m = e1.height, u = e1.width), t !== void 0 && (d = t), d.format = "RGBA", d.height = m, d.width = u, t !== void 0) {
                let h = l();
                h.width = u, h.height = m;
                let _ = p(h);
                if (_ != null) _.putImageData(e1, 0, 0), a = _.getImageData(0, 0, u, m).data;
                else throw new Error("Can not access image data");
            } else a = e1.data;
        } else if (o) {
            if (t === void 0) throw new Error("Please provide image config with format for Imagebitmap");
            let m = l();
            m.width = e1.width, m.height = e1.height;
            let u = p(m);
            if (u != null) {
                let h = e1.height, _ = e1.width;
                return u.drawImage(e1, 0, 0, _, h), a = u.getImageData(0, 0, _, h).data, d.height = h, d.width = _, Ln(a, d);
            } else throw new Error("Can not access image data");
        } else {
            if (i) return new Promise((m, u)=>{
                let h = l(), _ = p(h);
                if (!e1 || !_) return u();
                let y = new Image;
                y.crossOrigin = "Anonymous", y.src = e1, y.onload = ()=>{
                    h.width = y.width, h.height = y.height, _.drawImage(y, 0, 0, h.width, h.height);
                    let g = _.getImageData(0, 0, h.width, h.height);
                    d.height = h.height, d.width = h.width, m(Ln(g.data, d));
                };
            });
            throw new Error("Input data provided is not supported - aborted tensor creation");
        }
        if (a !== void 0) return Ln(a, d);
        throw new Error("Input data provided is not supported - aborted tensor creation");
    }, da = (e1, t)=>{
        let { width: r, height: n, download: o, dispose: i } = t, a = [
            1,
            n,
            r,
            4
        ];
        return new ze({
            location: "texture",
            type: "float32",
            texture: e1,
            dims: a,
            download: o,
            dispose: i
        });
    }, la = (e1, t)=>{
        let { dataType: r, dims: n, download: o, dispose: i } = t;
        return new ze({
            location: "gpu-buffer",
            type: r !== null && r !== void 0 ? r : "float32",
            gpuBuffer: e1,
            dims: n,
            download: o,
            dispose: i
        });
    }, ca = (e1, t)=>{
        let { dataType: r, dims: n, download: o, dispose: i } = t;
        return new ze({
            location: "ml-tensor",
            type: r !== null && r !== void 0 ? r : "float32",
            mlTensor: e1,
            dims: n,
            download: o,
            dispose: i
        });
    }, pa = (e1, t, r)=>new ze({
            location: "cpu-pinned",
            type: e1,
            data: t,
            dims: r !== null && r !== void 0 ? r : [
                t.length
            ]
        });
});
var Tt, qt, fa, ha, ga = U(()=>{
    "use strict";
    Tt = new Map([
        [
            "float32",
            Float32Array
        ],
        [
            "uint8",
            Uint8Array
        ],
        [
            "int8",
            Int8Array
        ],
        [
            "uint16",
            Uint16Array
        ],
        [
            "int16",
            Int16Array
        ],
        [
            "int32",
            Int32Array
        ],
        [
            "bool",
            Uint8Array
        ],
        [
            "float64",
            Float64Array
        ],
        [
            "uint32",
            Uint32Array
        ],
        [
            "int4",
            Uint8Array
        ],
        [
            "uint4",
            Uint8Array
        ]
    ]), qt = new Map([
        [
            Float32Array,
            "float32"
        ],
        [
            Uint8Array,
            "uint8"
        ],
        [
            Int8Array,
            "int8"
        ],
        [
            Uint16Array,
            "uint16"
        ],
        [
            Int16Array,
            "int16"
        ],
        [
            Int32Array,
            "int32"
        ],
        [
            Float64Array,
            "float64"
        ],
        [
            Uint32Array,
            "uint32"
        ]
    ]), fa = !1, ha = ()=>{
        if (!fa) {
            fa = !0;
            let e1 = typeof BigInt64Array < "u" && BigInt64Array.from, t = typeof BigUint64Array < "u" && BigUint64Array.from, r = typeof Float16Array < "u" && Float16Array.from;
            e1 && (Tt.set("int64", BigInt64Array), qt.set(BigInt64Array, "int64")), t && (Tt.set("uint64", BigUint64Array), qt.set(BigUint64Array, "uint64")), r ? (Tt.set("float16", Float16Array), qt.set(Float16Array, "float16")) : Tt.set("float16", Uint16Array);
        }
    };
});
var ba, ya, _a = U(()=>{
    "use strict";
    _r();
    ba = (e1)=>{
        let t = 1;
        for(let r = 0; r < e1.length; r++){
            let n = e1[r];
            if (typeof n != "number" || !Number.isSafeInteger(n)) throw new TypeError("dims[".concat(r, "] must be an integer, got: ").concat(n));
            if (n < 0) throw new RangeError("dims[".concat(r, "] must be a non-negative integer, got: ").concat(n));
            t *= n;
        }
        return t;
    }, ya = (e1, t)=>{
        switch(e1.location){
            case "cpu":
                return new ze(e1.type, e1.data, t);
            case "cpu-pinned":
                return new ze({
                    location: "cpu-pinned",
                    data: e1.data,
                    type: e1.type,
                    dims: t
                });
            case "texture":
                return new ze({
                    location: "texture",
                    texture: e1.texture,
                    type: e1.type,
                    dims: t
                });
            case "gpu-buffer":
                return new ze({
                    location: "gpu-buffer",
                    gpuBuffer: e1.gpuBuffer,
                    type: e1.type,
                    dims: t
                });
            case "ml-tensor":
                return new ze({
                    location: "ml-tensor",
                    mlTensor: e1.mlTensor,
                    type: e1.type,
                    dims: t
                });
            default:
                throw new Error("tensorReshape: tensor location ".concat(e1.location, " is not supported"));
        }
    };
});
var ze, _r = U(()=>{
    "use strict";
    sa();
    ma();
    ga();
    _a();
    ze = class {
        static async fromImage(t, r) {
            return ua(t, r);
        }
        static fromTexture(t, r) {
            return da(t, r);
        }
        static fromGpuBuffer(t, r) {
            return la(t, r);
        }
        static fromMLTensor(t, r) {
            return ca(t, r);
        }
        static fromPinnedBuffer(t, r, n) {
            return pa(t, r, n);
        }
        toDataURL(t) {
            return ia(this, t);
        }
        toImageData(t) {
            return aa(this, t);
        }
        get data() {
            if (this.ensureValid(), !this.cpuData) throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");
            return this.cpuData;
        }
        get location() {
            return this.dataLocation;
        }
        get texture() {
            if (this.ensureValid(), !this.gpuTextureData) throw new Error("The data is not stored as a WebGL texture.");
            return this.gpuTextureData;
        }
        get gpuBuffer() {
            if (this.ensureValid(), !this.gpuBufferData) throw new Error("The data is not stored as a WebGPU buffer.");
            return this.gpuBufferData;
        }
        get mlTensor() {
            if (this.ensureValid(), !this.mlTensorData) throw new Error("The data is not stored as a WebNN MLTensor.");
            return this.mlTensorData;
        }
        async getData(t) {
            switch(this.ensureValid(), this.dataLocation){
                case "cpu":
                case "cpu-pinned":
                    return this.data;
                case "texture":
                case "gpu-buffer":
                case "ml-tensor":
                    {
                        if (!this.downloader) throw new Error("The current tensor is not created with a specified data downloader.");
                        if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
                        try {
                            this.isDownloading = !0;
                            let r = await this.downloader();
                            return this.downloader = void 0, this.dataLocation = "cpu", this.cpuData = r, t && this.disposer && (this.disposer(), this.disposer = void 0), r;
                        } finally{
                            this.isDownloading = !1;
                        }
                    }
                default:
                    throw new Error("cannot get data from location: ".concat(this.dataLocation));
            }
        }
        dispose() {
            if (this.isDownloading) throw new Error("The current tensor is being downloaded.");
            this.disposer && (this.disposer(), this.disposer = void 0), this.cpuData = void 0, this.gpuTextureData = void 0, this.gpuBufferData = void 0, this.mlTensorData = void 0, this.downloader = void 0, this.isDownloading = void 0, this.dataLocation = "none";
        }
        ensureValid() {
            if (this.dataLocation === "none") throw new Error("The tensor is disposed.");
        }
        reshape(t) {
            if (this.ensureValid(), this.downloader || this.disposer) throw new Error("Cannot reshape a tensor that owns GPU resource.");
            return ya(this, t);
        }
        constructor(t, r, n){
            ha();
            let o, i;
            if (typeof t == "object" && "location" in t) switch(this.dataLocation = t.location, o = t.type, i = t.dims, t.location){
                case "cpu-pinned":
                    {
                        let d = Tt.get(o);
                        if (!d) throw new TypeError('unsupported type "'.concat(o, '" to create tensor from pinned buffer'));
                        if (!(t.data instanceof d)) throw new TypeError("buffer should be of type ".concat(d.name));
                        this.cpuData = t.data;
                        break;
                    }
                case "texture":
                    {
                        if (o !== "float32") throw new TypeError('unsupported type "'.concat(o, '" to create tensor from texture'));
                        this.gpuTextureData = t.texture, this.downloader = t.download, this.disposer = t.dispose;
                        break;
                    }
                case "gpu-buffer":
                    {
                        if (o !== "float32" && o !== "float16" && o !== "int32" && o !== "int64" && o !== "uint32" && o !== "uint8" && o !== "bool" && o !== "uint4" && o !== "int4") throw new TypeError('unsupported type "'.concat(o, '" to create tensor from gpu buffer'));
                        this.gpuBufferData = t.gpuBuffer, this.downloader = t.download, this.disposer = t.dispose;
                        break;
                    }
                case "ml-tensor":
                    {
                        if (o !== "float32" && o !== "float16" && o !== "int32" && o !== "int64" && o !== "uint32" && o !== "uint64" && o !== "int8" && o !== "uint8" && o !== "bool" && o !== "uint4" && o !== "int4") throw new TypeError('unsupported type "'.concat(o, '" to create tensor from MLTensor'));
                        this.mlTensorData = t.mlTensor, this.downloader = t.download, this.disposer = t.dispose;
                        break;
                    }
                default:
                    throw new Error("Tensor constructor: unsupported location '".concat(this.dataLocation, "'"));
            }
            else {
                let d, l;
                if (typeof t == "string") if (o = t, l = n, t === "string") {
                    if (!Array.isArray(r)) throw new TypeError("A string tensor's data must be a string array.");
                    d = r;
                } else {
                    let p = Tt.get(t);
                    if (p === void 0) throw new TypeError("Unsupported tensor type: ".concat(t, "."));
                    if (Array.isArray(r)) {
                        if (t === "float16" && p === Uint16Array || t === "uint4" || t === "int4") throw new TypeError("Creating a ".concat(t, " tensor from number array is not supported. Please use ").concat(p.name, " as data."));
                        t === "uint64" || t === "int64" ? d = p.from(r, BigInt) : d = p.from(r);
                    } else if (r instanceof p) d = r;
                    else if (r instanceof Uint8ClampedArray) if (t === "uint8") d = Uint8Array.from(r);
                    else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");
                    else throw new TypeError("A ".concat(o, " tensor's data must be type of ").concat(p));
                }
                else if (l = r, Array.isArray(t)) {
                    if (t.length === 0) throw new TypeError("Tensor type cannot be inferred from an empty array.");
                    let p = typeof t[0];
                    if (p === "string") o = "string", d = t;
                    else if (p === "boolean") o = "bool", d = Uint8Array.from(t);
                    else throw new TypeError("Invalid element type of data array: ".concat(p, "."));
                } else if (t instanceof Uint8ClampedArray) o = "uint8", d = Uint8Array.from(t);
                else {
                    let p = qt.get(t.constructor);
                    if (p === void 0) throw new TypeError("Unsupported type for tensor data: ".concat(t.constructor, "."));
                    o = p, d = t;
                }
                if (l === void 0) l = [
                    d.length
                ];
                else if (!Array.isArray(l)) throw new TypeError("A tensor's dims must be a number array");
                i = l, this.cpuData = d, this.dataLocation = "cpu";
            }
            let a = ba(i);
            if (this.cpuData && a !== this.cpuData.length && !((o === "uint4" || o === "int4") && Math.ceil(a / 2) === this.cpuData.length)) throw new Error("Tensor's size(".concat(a, ") does not match data length(").concat(this.cpuData.length, ")."));
            this.type = o, this.dims = i, this.size = a;
        }
    };
});
var He, Gn = U(()=>{
    "use strict";
    _r();
    He = ze;
});
var wr, wa, Ue, De, Hn = U(()=>{
    "use strict";
    Wn();
    wr = (e1, t)=>{
        (typeof Re.trace > "u" ? !Re.wasm.trace : !Re.trace) || console.timeStamp("".concat(e1, "::ORT::").concat(t));
    }, wa = (e1, t)=>{
        var _stack;
        let r = ((_stack = new Error().stack) === null || _stack === void 0 ? void 0 : _stack.split(/\r\n|\r|\n/g)) || [], n = !1;
        for(let o = 0; o < r.length; o++){
            if (n && !r[o].includes("TRACE_FUNC")) {
                let i = "FUNC_".concat(e1, "::").concat(r[o].trim().split(" ")[1]);
                t && (i += "::".concat(t)), wr("CPU", i);
                return;
            }
            r[o].includes("TRACE_FUNC") && (n = !0);
        }
    }, Ue = (e1)=>{
        (typeof Re.trace > "u" ? !Re.wasm.trace : !Re.trace) || wa("BEGIN", e1);
    }, De = (e1)=>{
        (typeof Re.trace > "u" ? !Re.wasm.trace : !Re.trace) || wa("END", e1);
    };
});
var vr, va = U(()=>{
    "use strict";
    Vn();
    Gn();
    Hn();
    vr = class e1 {
        async run(t, r, n) {
            Ue();
            let o = {}, i = {};
            if (typeof t != "object" || t === null || t instanceof He || Array.isArray(t)) throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");
            let a = !0;
            if (typeof r == "object") {
                if (r === null) throw new TypeError("Unexpected argument[1]: cannot be null.");
                if (r instanceof He) throw new TypeError("'fetches' cannot be a Tensor");
                if (Array.isArray(r)) {
                    if (r.length === 0) throw new TypeError("'fetches' cannot be an empty array.");
                    a = !1;
                    for (let p of r){
                        if (typeof p != "string") throw new TypeError("'fetches' must be a string array or an object.");
                        if (this.outputNames.indexOf(p) === -1) throw new RangeError("'fetches' contains invalid output name: ".concat(p, "."));
                        o[p] = null;
                    }
                    if (typeof n == "object" && n !== null) i = n;
                    else if (typeof n < "u") throw new TypeError("'options' must be an object.");
                } else {
                    let p = !1, m = Object.getOwnPropertyNames(r);
                    for (let u of this.outputNames)if (m.indexOf(u) !== -1) {
                        let h = r[u];
                        (h === null || h instanceof He) && (p = !0, a = !1, o[u] = h);
                    }
                    if (p) {
                        if (typeof n == "object" && n !== null) i = n;
                        else if (typeof n < "u") throw new TypeError("'options' must be an object.");
                    } else i = r;
                }
            } else if (typeof r < "u") throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");
            for (let p of this.inputNames)if (typeof t[p] > "u") throw new Error("input '".concat(p, "' is missing in 'feeds'."));
            if (a) for (let p of this.outputNames)o[p] = null;
            let d = await this.handler.run(t, o, i), l = {};
            for(let p in d)if (Object.hasOwnProperty.call(d, p)) {
                let m = d[p];
                m instanceof He ? l[p] = m : l[p] = new He(m.type, m.data, m.dims);
            }
            return De(), l;
        }
        async release() {
            return this.handler.dispose();
        }
        static async create(t, r, n, o) {
            Ue();
            let i, a = {};
            if (typeof t == "string") {
                if (i = t, typeof r == "object" && r !== null) a = r;
                else if (typeof r < "u") throw new TypeError("'options' must be an object.");
            } else if (t instanceof Uint8Array) {
                if (i = t, typeof r == "object" && r !== null) a = r;
                else if (typeof r < "u") throw new TypeError("'options' must be an object.");
            } else if (t instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && t instanceof SharedArrayBuffer) {
                let m = t, u = 0, h = t.byteLength;
                if (typeof r == "object" && r !== null) a = r;
                else if (typeof r == "number") {
                    if (u = r, !Number.isSafeInteger(u)) throw new RangeError("'byteOffset' must be an integer.");
                    if (u < 0 || u >= m.byteLength) throw new RangeError("'byteOffset' is out of range [0, ".concat(m.byteLength, ")."));
                    if (h = t.byteLength - u, typeof n == "number") {
                        if (h = n, !Number.isSafeInteger(h)) throw new RangeError("'byteLength' must be an integer.");
                        if (h <= 0 || u + h > m.byteLength) throw new RangeError("'byteLength' is out of range (0, ".concat(m.byteLength - u, "]."));
                        if (typeof o == "object" && o !== null) a = o;
                        else if (typeof o < "u") throw new TypeError("'options' must be an object.");
                    } else if (typeof n < "u") throw new TypeError("'byteLength' must be a number.");
                } else if (typeof r < "u") throw new TypeError("'options' must be an object.");
                i = new Uint8Array(m, u, h);
            } else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");
            let [d, l] = await Ji(a), p = await d.createInferenceSessionHandler(i, l);
            return De(), new e1(p);
        }
        startProfiling() {
            this.handler.startProfiling();
        }
        endProfiling() {
            this.handler.endProfiling();
        }
        get inputNames() {
            return this.handler.inputNames;
        }
        get outputNames() {
            return this.handler.outputNames;
        }
        constructor(t){
            this.handler = t;
        }
    };
});
var Fp, $a = U(()=>{
    "use strict";
    va();
    Fp = vr;
});
var xa = U(()=>{
    "use strict";
});
var Sa = U(_c1 = ()=>{
    "use strict";
});
_c2 = Sa;
var Ta = U(_c3 = ()=>{
    "use strict";
});
_c4 = Ta;
var Ia = U(_c5 = ()=>{
    "use strict";
});
_c6 = Ia;
var Fn = {};
Ft(Fn, {
    InferenceSession: ()=>Fp,
    TRACE: ()=>wr,
    TRACE_FUNC_BEGIN: ()=>Ue,
    TRACE_FUNC_END: ()=>De,
    Tensor: ()=>He,
    env: ()=>ve,
    registerBackend: ()=>St
});
var We = U(_c7 = ()=>{
    "use strict";
    ea();
    oa();
    $a();
    Gn();
    xa();
    Sa();
    Hn();
    Ta();
    Ia();
});
_c8 = We;
var $r = U(()=>{
    "use strict";
});
var Ea = {};
Ft(Ea, {
    default: ()=>qp
});
var Aa, ka, qp, Pa = U(()=>{
    "use strict";
    var _globalThis_self;
    qn();
    gt();
    xr();
    Aa = "ort-wasm-proxy-worker", ka = ((_globalThis_self = globalThis.self) === null || _globalThis_self === void 0 ? void 0 : _globalThis_self.name) === Aa;
    ka && (self.onmessage = (e1)=>{
        let { type: t, in: r } = e1.data;
        try {
            switch(t){
                case "init-wasm":
                    Sr(r.wasm).then(()=>{
                        Tr(r).then(()=>{
                            postMessage({
                                type: t
                            });
                        }, (n)=>{
                            postMessage({
                                type: t,
                                err: n
                            });
                        });
                    }, (n)=>{
                        postMessage({
                            type: t,
                            err: n
                        });
                    });
                    break;
                case "init-ep":
                    {
                        let { epName: n, env: o } = r;
                        Ir(o, n).then(()=>{
                            postMessage({
                                type: t
                            });
                        }, (i)=>{
                            postMessage({
                                type: t,
                                err: i
                            });
                        });
                        break;
                    }
                case "copy-from":
                    {
                        let { buffer: n } = r, o = Kt(n);
                        postMessage({
                            type: t,
                            out: o
                        });
                        break;
                    }
                case "create":
                    {
                        let { model: n, options: o } = r;
                        Cr(n, o).then((i)=>{
                            postMessage({
                                type: t,
                                out: i
                            });
                        }, (i)=>{
                            postMessage({
                                type: t,
                                err: i
                            });
                        });
                        break;
                    }
                case "release":
                    Ar(r), postMessage({
                        type: t
                    });
                    break;
                case "run":
                    {
                        let { sessionId: n, inputIndices: o, inputs: i, outputIndices: a, options: d } = r;
                        kr(n, o, i, a, new Array(a.length).fill(null), d).then((l)=>{
                            l.some((p)=>p[3] !== "cpu") ? postMessage({
                                type: t,
                                err: "Proxy does not support non-cpu tensor location."
                            }) : postMessage({
                                type: t,
                                out: l
                            }, Pr([
                                ...i,
                                ...l
                            ]));
                        }, (l)=>{
                            postMessage({
                                type: t,
                                err: l
                            });
                        });
                        break;
                    }
                case "end-profiling":
                    Er(r), postMessage({
                        type: t
                    });
                    break;
                default:
            }
        } catch (n) {
            postMessage({
                type: t,
                err: n
            });
        }
    });
    qp = ka ? null : (e1)=>new Worker(e1 !== null && e1 !== void 0 ? e1 : Ne, {
            type: "module",
            name: Aa
        });
});
var Oa = {};
Ft(Oa, {
    default: ()=>Kp
});
var Kn, za, Kp, Da = U(()=>{
    "use strict";
    var _globalThis_self;
    za = (Kn = import.meta.url, async function() {
        let e1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        function t() {
            return se.buffer != J.buffer && ye(), J;
        }
        function r() {
            return se.buffer != J.buffer && ye(), ne;
        }
        function n() {
            return se.buffer != J.buffer && ye(), be;
        }
        function o() {
            return se.buffer != J.buffer && ye(), Oe;
        }
        function i() {
            return se.buffer != J.buffer && ye(), $e;
        }
        function a() {
            return se.buffer != J.buffer && ye(), le;
        }
        function d() {
            return se.buffer != J.buffer && ye(), W;
        }
        function l() {
            return se.buffer != J.buffer && ye(), Ge;
        }
        var p, m, u = Object.assign({}, e1), h = new Promise((s, c)=>{
            p = s, m = c;
        }), _ = "object" == "object", y = typeof importScripts == "function", g = y && self.name == "em-pthread";
        u.mountExternalData = (s, c)=>{
            s.startsWith("./") && (s = s.substring(2)), (u.Fb || (u.Fb = new Map)).set(s, c);
        }, u.unmountExternalData = ()=>{
            delete u.Fb;
        };
        var _globalThis_SharedArrayBuffer;
        var x = (_globalThis_SharedArrayBuffer = globalThis.SharedArrayBuffer) !== null && _globalThis_SharedArrayBuffer !== void 0 ? _globalThis_SharedArrayBuffer : new WebAssembly.Memory({
            initial: 0,
            maximum: 0,
            shared: !0
        }).buffer.constructor;
        let $ = ()=>{
            let s = (f, b, w)=>function() {
                    for(var _len = arguments.length, I = new Array(_len), _key = 0; _key < _len; _key++){
                        I[_key] = arguments[_key];
                    }
                    let O = Xe, B = b === null || b === void 0 ? void 0 : b();
                    I = f(...I);
                    let L = b === null || b === void 0 ? void 0 : b();
                    return B !== L && (f = L, w(B), b = w = null), Xe != O ? new Promise((H, X)=>{
                        En = {
                            resolve: H,
                            reject: X
                        };
                    }) : I;
                }, c = (f)=>async function() {
                    for(var _len = arguments.length, b = new Array(_len), _key = 0; _key < _len; _key++){
                        b[_key] = arguments[_key];
                    }
                    try {
                        var _u_Hb;
                        if (u.Gb) throw Error("Session already started");
                        let w = u.Gb = {
                            hc: b[0],
                            errors: []
                        }, I = await f(...b);
                        if (u.Gb !== w) throw Error("Session mismatch");
                        (_u_Hb = u.Hb) === null || _u_Hb === void 0 ? void 0 : _u_Hb.flush();
                        let O = w.errors;
                        if (0 < O.length) {
                            let B = await Promise.all(O);
                            if (B = B.filter((L)=>L), 0 < B.length) throw Error(B.join("\n"));
                        }
                        return I;
                    } finally{
                        u.Gb = null;
                    }
                };
            u._OrtCreateSession = s(u._OrtCreateSession, ()=>u._OrtCreateSession, (f)=>u._OrtCreateSession = f), u._OrtRun = c(s(u._OrtRun, ()=>u._OrtRun, (f)=>u._OrtRun = f)), u._OrtRunWithBinding = c(s(u._OrtRunWithBinding, ()=>u._OrtRunWithBinding, (f)=>u._OrtRunWithBinding = f)), u._OrtBindInput = s(u._OrtBindInput, ()=>u._OrtBindInput, (f)=>u._OrtBindInput = f), $ = void 0;
        };
        u.jsepInit = (s, c)=>{
            if ($ === null || $ === void 0 ? void 0 : $(), s === "webgpu") {
                [u.Hb, u.Vb, u.Zb, u.Ob, u.Yb, u.kb, u.$b, u.cc, u.Wb, u.Xb, u.ac] = c;
                let f = u.Hb;
                u.jsepRegisterBuffer = (b, w, I, O)=>f.registerBuffer(b, w, I, O), u.jsepGetBuffer = (b)=>f.getBuffer(b), u.jsepCreateDownloader = (b, w, I)=>f.createDownloader(b, w, I), u.jsepOnCreateSession = (b)=>{
                    f.onCreateSession(b);
                }, u.jsepOnReleaseSession = (b)=>{
                    f.onReleaseSession(b);
                }, u.jsepOnRunStart = (b)=>f.onRunStart(b), u.dc = (b, w)=>{
                    f.upload(b, w);
                };
            } else if (s === "webnn") {
                [u.Hb, u.bc, u.Pb, u.jsepEnsureTensor, u.ec, u.jsepDownloadTensor] = c, u.jsepReleaseTensorId = u.Pb;
                let f = u.Hb;
                u.jsepOnRunStart = (b)=>f.onRunStart(b), u.jsepRegisterMLContext = (b, w)=>{
                    f.registerMLContext(b, w);
                }, u.jsepOnReleaseSession = (b)=>{
                    f.onReleaseSession(b);
                }, u.jsepCreateMLTensorDownloader = (b, w)=>f.createMLTensorDownloader(b, w), u.jsepRegisterMLTensor = (b, w, I)=>f.registerMLTensor(b, w, I), u.jsepCreateMLContext = (b)=>f.createMLContext(b), u.jsepRegisterMLConstant = (b, w, I, O, B)=>f.registerMLConstant(b, w, I, O, B, u.Fb);
            }
        };
        var v, S, T = Object.assign({}, u), A = "./this.program", k = (s, c)=>{
            throw c;
        }, P = "";
        (_ || y) && (y ? P = self.location.href : typeof document < "u" && document.currentScript && (P = document.currentScript.src), Kn && (P = Kn), P = P.startsWith("blob:") ? "" : P.substr(0, P.replace(/[?#].*/, "").lastIndexOf("/") + 1), y && (S = (s)=>{
            var c = new XMLHttpRequest;
            return c.open("GET", s, !1), c.responseType = "arraybuffer", c.send(null), new Uint8Array(c.response);
        }), v = (s, c, f)=>{
            var b = new XMLHttpRequest;
            b.open("GET", s, !0), b.responseType = "arraybuffer", b.onload = ()=>{
                b.status == 200 || b.status == 0 && b.response ? c(b.response) : f();
            }, b.onerror = f, b.send(null);
        });
        var D, R = console.log.bind(console), G = console.error.bind(console), K = R, j = G;
        if (Object.assign(u, T), T = null, g) {
            let s = function(c) {
                try {
                    var f = c.data, b = f.cmd;
                    if (b === "load") {
                        let w = [];
                        self.onmessage = (I)=>w.push(I), self.startWorker = ()=>{
                            postMessage({
                                cmd: "loaded"
                            });
                            for (let I of w)s(I);
                            self.onmessage = s;
                        };
                        for (let I of f.handlers)u[I] && !u[I].proxy || (u[I] = function() {
                            for(var _len = arguments.length, O = new Array(_len), _key = 0; _key < _len; _key++){
                                O[_key] = arguments[_key];
                            }
                            postMessage({
                                Nb: "callHandler",
                                pc: I,
                                args: O
                            });
                        }, I == "print" && (K = u[I]), I == "printErr" && (j = u[I]));
                        se = f.wasmMemory, ye(), V(f.wasmModule);
                    } else if (b === "run") {
                        Dn(f.pthread_ptr, 0, 0, 1, 0, 0), An(f.pthread_ptr), xc(), Ho(), Q || (Wi(), Q = !0);
                        try {
                            Sc(f.start_routine, f.arg);
                        } catch (w) {
                            if (w != "unwind") throw w;
                        }
                    } else b === "cancel" ? Mt() && hr(-1) : f.target !== "setimmediate" && (b === "checkMailbox" ? Q && ir() : b && (j("worker: received unknown command ".concat(b)), j(f)));
                } catch (w) {
                    throw Li(), w;
                }
            };
            var wg = s, V, Q = !1;
            j = function() {
                for(var _len = arguments.length, c = new Array(_len), _key = 0; _key < _len; _key++){
                    c[_key] = arguments[_key];
                }
                c = c.join(" "), console.error(c);
            }, self.alert = function() {
                for(var _len = arguments.length, c = new Array(_len), _key = 0; _key < _len; _key++){
                    c[_key] = arguments[_key];
                }
                postMessage({
                    Nb: "alert",
                    text: c.join(" "),
                    rc: Mt()
                });
            }, u.instantiateWasm = (c, f)=>new Promise((b)=>{
                    V = (w)=>{
                        w = new WebAssembly.Instance(w, No()), f(w), b();
                    };
                }), self.onunhandledrejection = (c)=>{
                throw c.reason || c;
            }, self.onmessage = s;
        }
        u.wasmBinary && (D = u.wasmBinary);
        var se, Y, ee, J, ne, be, Oe, $e, le, W, q, he, Ge, we = !1;
        function ye() {
            var s = se.buffer;
            u.HEAP8 = J = new Int8Array(s), u.HEAP16 = be = new Int16Array(s), u.HEAPU8 = ne = new Uint8Array(s), u.HEAPU16 = Oe = new Uint16Array(s), u.HEAP32 = $e = new Int32Array(s), u.HEAPU32 = le = new Uint32Array(s), u.HEAPF32 = W = new Float32Array(s), u.HEAPF64 = Ge = new Float64Array(s), u.HEAP64 = q = new BigInt64Array(s), u.HEAPU64 = he = new BigUint64Array(s);
        }
        if (!g) {
            if (!((se = new WebAssembly.Memory({
                initial: 256,
                maximum: 65536,
                shared: !0
            })).buffer instanceof x)) throw j("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), Error("bad memory");
            ye();
        }
        var Ye = [], Lt = [], fn = [], Gt = 0, hn = null, Ht = null;
        function Do() {
            if (--Gt == 0 && (hn !== null && (clearInterval(hn), hn = null), Ht)) {
                var s = Ht;
                Ht = null, s();
            }
        }
        function ct(s) {
            throw j(s = "Aborted(" + s + ")"), we = !0, ee = 1, s = new WebAssembly.RuntimeError(s + ". Build with -sASSERTIONS for more info."), m(s), s;
        }
        var gn, Bo = (s)=>s.startsWith("data:application/octet-stream;base64,"), Mo = (s)=>s.startsWith("file://");
        function Ro(s) {
            if (s == gn && D) return new Uint8Array(D);
            if (S) return S(s);
            throw "both async and sync fetching of the wasm failed";
        }
        function Uo(s, c, f) {
            return (function(b) {
                if (!D && (_ || y)) {
                    if (typeof fetch == "function" && !Mo(b)) return fetch(b, {
                        credentials: "same-origin"
                    }).then((w)=>{
                        if (!w.ok) throw "failed to load wasm binary file at '".concat(b, "'");
                        return w.arrayBuffer();
                    }).catch(()=>Ro(b));
                    if (v) return new Promise((w, I)=>{
                        v(b, (O)=>w(new Uint8Array(O)), I);
                    });
                }
                return Promise.resolve().then(()=>Ro(b));
            })(s).then((b)=>WebAssembly.instantiate(b, c)).then(f, (b)=>{
                j("failed to asynchronously prepare wasm: ".concat(b)), ct(b);
            });
        }
        function No() {
            return {
                a: {
                    O: $c,
                    Aa: vc,
                    b: Ic,
                    aa: jo,
                    B: Qo,
                    qa: Xo,
                    Y: ei,
                    _: ti,
                    ra: ri,
                    oa: ni,
                    ha: oi,
                    na: ii,
                    L: ai,
                    Z: si,
                    W: ui,
                    pa: di,
                    X: li,
                    va: Cc,
                    F: kc,
                    Q: Ec,
                    P: zc,
                    E: Dc,
                    u: Bc,
                    q: Mc,
                    G: Rc,
                    A: Hc,
                    R: Fc,
                    ua: qc,
                    ka: Kc,
                    U: jc,
                    ba: Yc,
                    H: Zc,
                    ja: An,
                    ta: Qc,
                    t: Xc,
                    Ba: Jc,
                    x: rp,
                    n: np,
                    l: ip,
                    c: In,
                    o: ap,
                    j: dp,
                    w: lp,
                    p: cp,
                    f: pp,
                    s: mp,
                    m: fp,
                    e: hp,
                    k: gp,
                    i: bp,
                    h: yp,
                    d: _p,
                    ea: wp,
                    fa: vp,
                    ga: $p,
                    ca: Si,
                    da: Ti,
                    T: xp,
                    g: Sp,
                    D: Tp,
                    I: Ip,
                    M: Cp,
                    y: Ap,
                    sa: kp,
                    V: Ep,
                    v: Ci,
                    z: Pp,
                    N: zp,
                    S: Op,
                    za: Dp,
                    ya: Bp,
                    la: Ei,
                    ma: Pi,
                    $: vn,
                    C: zi,
                    K: Oi,
                    ia: Di,
                    J: Bi,
                    a: se,
                    xa: wn,
                    wa: Ui,
                    r: Up
                }
            };
        }
        var bn = {
            913700: (s, c, f, b, w)=>{
                if (u === void 0 || !u.Fb) return 1;
                if ((s = Ce(Number(s >>> 0))).startsWith("./") && (s = s.substring(2)), !(s = u.Fb.get(s))) return 2;
                if (c = Number(c >>> 0), f = Number(f >>> 0), b = Number(b >>> 0), c + f > s.byteLength) return 3;
                try {
                    let I = s.subarray(c, c + f);
                    switch(w){
                        case 0:
                            r().set(I, b >>> 0);
                            break;
                        case 1:
                            u.dc(b, I);
                            break;
                        default:
                            return 4;
                    }
                    return 0;
                } catch (e1) {
                    return 4;
                }
            },
            914415: (s, c, f)=>{
                u.ec(s, r().subarray(c >>> 0, c + f >>> 0));
            },
            914478: ()=>u.bc(),
            914519: (s)=>{
                u.Pb(s);
            },
            914555: ()=>{
                u.Wb();
            },
            914586: ()=>{
                u.Xb();
            },
            914615: ()=>{
                u.ac();
            },
            914640: (s)=>u.Vb(s),
            914673: (s)=>u.Zb(s),
            914705: (s, c, f)=>{
                u.Ob(Number(s), Number(c), Number(f), !0);
            },
            914768: (s, c, f)=>{
                u.Ob(Number(s), Number(c), Number(f));
            },
            914825: ()=>typeof wasmOffsetConverter < "u",
            914882: (s)=>{
                u.kb("Abs", s, void 0);
            },
            914933: (s)=>{
                u.kb("Neg", s, void 0);
            },
            914984: (s)=>{
                u.kb("Floor", s, void 0);
            },
            915037: (s)=>{
                u.kb("Ceil", s, void 0);
            },
            915089: (s)=>{
                u.kb("Reciprocal", s, void 0);
            },
            915147: (s)=>{
                u.kb("Sqrt", s, void 0);
            },
            915199: (s)=>{
                u.kb("Exp", s, void 0);
            },
            915250: (s)=>{
                u.kb("Erf", s, void 0);
            },
            915301: (s)=>{
                u.kb("Sigmoid", s, void 0);
            },
            915356: (s, c, f)=>{
                u.kb("HardSigmoid", s, {
                    alpha: c,
                    beta: f
                });
            },
            915435: (s)=>{
                u.kb("Log", s, void 0);
            },
            915486: (s)=>{
                u.kb("Sin", s, void 0);
            },
            915537: (s)=>{
                u.kb("Cos", s, void 0);
            },
            915588: (s)=>{
                u.kb("Tan", s, void 0);
            },
            915639: (s)=>{
                u.kb("Asin", s, void 0);
            },
            915691: (s)=>{
                u.kb("Acos", s, void 0);
            },
            915743: (s)=>{
                u.kb("Atan", s, void 0);
            },
            915795: (s)=>{
                u.kb("Sinh", s, void 0);
            },
            915847: (s)=>{
                u.kb("Cosh", s, void 0);
            },
            915899: (s)=>{
                u.kb("Asinh", s, void 0);
            },
            915952: (s)=>{
                u.kb("Acosh", s, void 0);
            },
            916005: (s)=>{
                u.kb("Atanh", s, void 0);
            },
            916058: (s)=>{
                u.kb("Tanh", s, void 0);
            },
            916110: (s)=>{
                u.kb("Not", s, void 0);
            },
            916161: (s, c, f)=>{
                u.kb("Clip", s, {
                    min: c,
                    max: f
                });
            },
            916230: (s)=>{
                u.kb("Clip", s, void 0);
            },
            916282: (s, c)=>{
                u.kb("Elu", s, {
                    alpha: c
                });
            },
            916340: (s)=>{
                u.kb("Gelu", s, void 0);
            },
            916392: (s)=>{
                u.kb("Relu", s, void 0);
            },
            916444: (s, c)=>{
                u.kb("LeakyRelu", s, {
                    alpha: c
                });
            },
            916508: (s, c)=>{
                u.kb("ThresholdedRelu", s, {
                    alpha: c
                });
            },
            916578: (s, c)=>{
                u.kb("Cast", s, {
                    to: c
                });
            },
            916636: (s)=>{
                u.kb("Add", s, void 0);
            },
            916687: (s)=>{
                u.kb("Sub", s, void 0);
            },
            916738: (s)=>{
                u.kb("Mul", s, void 0);
            },
            916789: (s)=>{
                u.kb("Div", s, void 0);
            },
            916840: (s)=>{
                u.kb("Pow", s, void 0);
            },
            916891: (s)=>{
                u.kb("Equal", s, void 0);
            },
            916944: (s)=>{
                u.kb("Greater", s, void 0);
            },
            916999: (s)=>{
                u.kb("GreaterOrEqual", s, void 0);
            },
            917061: (s)=>{
                u.kb("Less", s, void 0);
            },
            917113: (s)=>{
                u.kb("LessOrEqual", s, void 0);
            },
            917172: (s, c, f, b, w)=>{
                u.kb("ReduceMean", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            917347: (s, c, f, b, w)=>{
                u.kb("ReduceMax", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            917521: (s, c, f, b, w)=>{
                u.kb("ReduceMin", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            917695: (s, c, f, b, w)=>{
                u.kb("ReduceProd", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            917870: (s, c, f, b, w)=>{
                u.kb("ReduceSum", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            918044: (s, c, f, b, w)=>{
                u.kb("ReduceL1", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            918217: (s, c, f, b, w)=>{
                u.kb("ReduceL2", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            918390: (s, c, f, b, w)=>{
                u.kb("ReduceLogSum", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            918567: (s, c, f, b, w)=>{
                u.kb("ReduceSumSquare", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            918747: (s, c, f, b, w)=>{
                u.kb("ReduceLogSumExp", s, {
                    keepDims: !!c,
                    noopWithEmptyAxes: !!f,
                    axes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            918927: (s)=>{
                u.kb("Where", s, void 0);
            },
            918980: (s, c, f)=>{
                u.kb("Transpose", s, {
                    perm: c ? Array.from(i().subarray(Number(c) >>> 0, Number(f) >>> 0)) : []
                });
            },
            919104: (s, c, f, b)=>{
                u.kb("DepthToSpace", s, {
                    blocksize: c,
                    mode: Ce(f),
                    format: b ? "NHWC" : "NCHW"
                });
            },
            919237: (s, c, f, b)=>{
                u.kb("DepthToSpace", s, {
                    blocksize: c,
                    mode: Ce(f),
                    format: b ? "NHWC" : "NCHW"
                });
            },
            919370: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z, de)=>{
                u.kb("ConvTranspose", s, {
                    format: L ? "NHWC" : "NCHW",
                    autoPad: c,
                    dilations: [
                        f
                    ],
                    group: b,
                    kernelShape: [
                        w
                    ],
                    pads: [
                        I,
                        O
                    ],
                    strides: [
                        B
                    ],
                    wIsConst: ()=>!!t()[H >>> 0],
                    outputPadding: X ? Array.from(i().subarray(Number(X) >>> 0, Number(ce) >>> 0)) : [],
                    outputShape: ge ? Array.from(i().subarray(Number(ge) >>> 0, Number(z) >>> 0)) : [],
                    activation: Ce(de)
                });
            },
            919803: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z)=>{
                u.kb("ConvTranspose", s, {
                    format: B ? "NHWC" : "NCHW",
                    autoPad: c,
                    dilations: Array.from(i().subarray(Number(f) >>> 0, 2 + (Number(f) >>> 0) >>> 0)),
                    group: b,
                    kernelShape: Array.from(i().subarray(Number(w) >>> 0, 2 + (Number(w) >>> 0) >>> 0)),
                    pads: Array.from(i().subarray(Number(I) >>> 0, 4 + (Number(I) >>> 0) >>> 0)),
                    strides: Array.from(i().subarray(Number(O) >>> 0, 2 + (Number(O) >>> 0) >>> 0)),
                    wIsConst: ()=>!!t()[L >>> 0],
                    outputPadding: H ? Array.from(i().subarray(Number(H) >>> 0, Number(X) >>> 0)) : [],
                    outputShape: ce ? Array.from(i().subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : [],
                    activation: Ce(z)
                });
            },
            920464: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z, de)=>{
                u.kb("ConvTranspose", s, {
                    format: L ? "NHWC" : "NCHW",
                    autoPad: c,
                    dilations: [
                        f
                    ],
                    group: b,
                    kernelShape: [
                        w
                    ],
                    pads: [
                        I,
                        O
                    ],
                    strides: [
                        B
                    ],
                    wIsConst: ()=>!!t()[H >>> 0],
                    outputPadding: X ? Array.from(i().subarray(Number(X) >>> 0, Number(ce) >>> 0)) : [],
                    outputShape: ge ? Array.from(i().subarray(Number(ge) >>> 0, Number(z) >>> 0)) : [],
                    activation: Ce(de)
                });
            },
            920897: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z)=>{
                u.kb("ConvTranspose", s, {
                    format: B ? "NHWC" : "NCHW",
                    autoPad: c,
                    dilations: Array.from(i().subarray(Number(f) >>> 0, 2 + (Number(f) >>> 0) >>> 0)),
                    group: b,
                    kernelShape: Array.from(i().subarray(Number(w) >>> 0, 2 + (Number(w) >>> 0) >>> 0)),
                    pads: Array.from(i().subarray(Number(I) >>> 0, 4 + (Number(I) >>> 0) >>> 0)),
                    strides: Array.from(i().subarray(Number(O) >>> 0, 2 + (Number(O) >>> 0) >>> 0)),
                    wIsConst: ()=>!!t()[L >>> 0],
                    outputPadding: H ? Array.from(i().subarray(Number(H) >>> 0, Number(X) >>> 0)) : [],
                    outputShape: ce ? Array.from(i().subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : [],
                    activation: Ce(z)
                });
            },
            921558: (s, c)=>{
                u.kb("GlobalAveragePool", s, {
                    format: c ? "NHWC" : "NCHW"
                });
            },
            921649: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z)=>{
                u.kb("AveragePool", s, {
                    format: z ? "NHWC" : "NCHW",
                    auto_pad: c,
                    ceil_mode: f,
                    count_include_pad: b,
                    storage_order: w,
                    dilations: I ? Array.from(i().subarray(Number(I) >>> 0, Number(O) >>> 0)) : [],
                    kernel_shape: B ? Array.from(i().subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
                    pads: H ? Array.from(i().subarray(Number(H) >>> 0, Number(X) >>> 0)) : [],
                    strides: ce ? Array.from(i().subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
                });
            },
            922128: (s, c)=>{
                u.kb("GlobalAveragePool", s, {
                    format: c ? "NHWC" : "NCHW"
                });
            },
            922219: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z)=>{
                u.kb("AveragePool", s, {
                    format: z ? "NHWC" : "NCHW",
                    auto_pad: c,
                    ceil_mode: f,
                    count_include_pad: b,
                    storage_order: w,
                    dilations: I ? Array.from(i().subarray(Number(I) >>> 0, Number(O) >>> 0)) : [],
                    kernel_shape: B ? Array.from(i().subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
                    pads: H ? Array.from(i().subarray(Number(H) >>> 0, Number(X) >>> 0)) : [],
                    strides: ce ? Array.from(i().subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
                });
            },
            922698: (s, c)=>{
                u.kb("GlobalMaxPool", s, {
                    format: c ? "NHWC" : "NCHW"
                });
            },
            922785: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z)=>{
                u.kb("MaxPool", s, {
                    format: z ? "NHWC" : "NCHW",
                    auto_pad: c,
                    ceil_mode: f,
                    count_include_pad: b,
                    storage_order: w,
                    dilations: I ? Array.from(i().subarray(Number(I) >>> 0, Number(O) >>> 0)) : [],
                    kernel_shape: B ? Array.from(i().subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
                    pads: H ? Array.from(i().subarray(Number(H) >>> 0, Number(X) >>> 0)) : [],
                    strides: ce ? Array.from(i().subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
                });
            },
            923260: (s, c)=>{
                u.kb("GlobalMaxPool", s, {
                    format: c ? "NHWC" : "NCHW"
                });
            },
            923347: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z)=>{
                u.kb("MaxPool", s, {
                    format: z ? "NHWC" : "NCHW",
                    auto_pad: c,
                    ceil_mode: f,
                    count_include_pad: b,
                    storage_order: w,
                    dilations: I ? Array.from(i().subarray(Number(I) >>> 0, Number(O) >>> 0)) : [],
                    kernel_shape: B ? Array.from(i().subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
                    pads: H ? Array.from(i().subarray(Number(H) >>> 0, Number(X) >>> 0)) : [],
                    strides: ce ? Array.from(i().subarray(Number(ce) >>> 0, Number(ge) >>> 0)) : []
                });
            },
            923822: (s, c, f, b, w)=>{
                u.kb("Gemm", s, {
                    alpha: c,
                    beta: f,
                    transA: b,
                    transB: w
                });
            },
            923926: (s)=>{
                u.kb("MatMul", s, void 0);
            },
            923980: (s, c, f, b)=>{
                u.kb("ArgMax", s, {
                    keepDims: !!c,
                    selectLastIndex: !!f,
                    axis: b
                });
            },
            924088: (s, c, f, b)=>{
                u.kb("ArgMin", s, {
                    keepDims: !!c,
                    selectLastIndex: !!f,
                    axis: b
                });
            },
            924196: (s, c)=>{
                u.kb("Softmax", s, {
                    axis: c
                });
            },
            924259: (s, c)=>{
                u.kb("Concat", s, {
                    axis: c
                });
            },
            924319: (s, c, f, b, w)=>{
                u.kb("Split", s, {
                    axis: c,
                    numOutputs: f,
                    splitSizes: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            924475: (s)=>{
                u.kb("Expand", s, void 0);
            },
            924529: (s, c)=>{
                u.kb("Gather", s, {
                    axis: Number(c)
                });
            },
            924600: (s, c)=>{
                u.kb("GatherElements", s, {
                    axis: Number(c)
                });
            },
            924679: (s, c)=>{
                u.kb("GatherND", s, {
                    batch_dims: Number(c)
                });
            },
            924758: (s, c, f, b, w, I, O, B, L, H, X)=>{
                u.kb("Resize", s, {
                    antialias: c,
                    axes: f ? Array.from(i().subarray(Number(f) >>> 0, Number(b) >>> 0)) : [],
                    coordinateTransformMode: Ce(w),
                    cubicCoeffA: I,
                    excludeOutside: O,
                    extrapolationValue: B,
                    keepAspectRatioPolicy: Ce(L),
                    mode: Ce(H),
                    nearestMode: Ce(X)
                });
            },
            925120: (s, c, f, b, w, I, O)=>{
                u.kb("Slice", s, {
                    starts: c ? Array.from(i().subarray(Number(c) >>> 0, Number(f) >>> 0)) : [],
                    ends: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : [],
                    axes: I ? Array.from(i().subarray(Number(I) >>> 0, Number(O) >>> 0)) : []
                });
            },
            925384: (s)=>{
                u.kb("Tile", s, void 0);
            },
            925436: (s, c, f)=>{
                u.kb("InstanceNormalization", s, {
                    epsilon: c,
                    format: f ? "NHWC" : "NCHW"
                });
            },
            925550: (s, c, f)=>{
                u.kb("InstanceNormalization", s, {
                    epsilon: c,
                    format: f ? "NHWC" : "NCHW"
                });
            },
            925664: (s)=>{
                u.kb("Range", s, void 0);
            },
            925717: (s, c)=>{
                u.kb("Einsum", s, {
                    equation: Ce(c)
                });
            },
            925798: (s, c, f, b, w)=>{
                u.kb("Pad", s, {
                    mode: c,
                    value: f,
                    pads: b ? Array.from(i().subarray(Number(b) >>> 0, Number(w) >>> 0)) : []
                });
            },
            925941: (s, c, f, b, w, I)=>{
                u.kb("BatchNormalization", s, {
                    epsilon: c,
                    momentum: f,
                    spatial: !!w,
                    trainingMode: !!b,
                    format: I ? "NHWC" : "NCHW"
                });
            },
            926110: (s, c, f, b, w, I)=>{
                u.kb("BatchNormalization", s, {
                    epsilon: c,
                    momentum: f,
                    spatial: !!w,
                    trainingMode: !!b,
                    format: I ? "NHWC" : "NCHW"
                });
            },
            926279: (s, c, f)=>{
                u.kb("CumSum", s, {
                    exclusive: Number(c),
                    reverse: Number(f)
                });
            },
            926376: (s, c, f)=>{
                u.kb("DequantizeLinear", s, {
                    axis: c,
                    blockSize: f
                });
            },
            926466: (s, c, f, b, w)=>{
                u.kb("GridSample", s, {
                    align_corners: c,
                    mode: Ce(f),
                    padding_mode: Ce(b),
                    format: w ? "NHWC" : "NCHW"
                });
            },
            926636: (s, c, f, b, w)=>{
                u.kb("GridSample", s, {
                    align_corners: c,
                    mode: Ce(f),
                    padding_mode: Ce(b),
                    format: w ? "NHWC" : "NCHW"
                });
            },
            926806: (s, c, f, b, w, I, O, B, L)=>{
                u.kb("Attention", s, {
                    numHeads: c,
                    isUnidirectional: f,
                    maskFilterValue: b,
                    scale: w,
                    doRotary: I,
                    qkvHiddenSizes: O ? Array.from(i().subarray(Number(B) >>> 0, Number(B) + O >>> 0)) : [],
                    pastPresentShareBuffer: !!L
                });
            },
            927078: (s)=>{
                u.kb("BiasAdd", s, void 0);
            },
            927133: (s)=>{
                u.kb("BiasSplitGelu", s, void 0);
            },
            927194: (s)=>{
                u.kb("FastGelu", s, void 0);
            },
            927250: (s, c, f, b, w, I, O, B, L, H, X, ce, ge, z, de, Te)=>{
                u.kb("Conv", s, {
                    format: ce ? "NHWC" : "NCHW",
                    auto_pad: c,
                    dilations: f ? Array.from(i().subarray(Number(f) >>> 0, Number(b) >>> 0)) : [],
                    group: w,
                    kernel_shape: I ? Array.from(i().subarray(Number(I) >>> 0, Number(O) >>> 0)) : [],
                    pads: B ? Array.from(i().subarray(Number(B) >>> 0, Number(L) >>> 0)) : [],
                    strides: H ? Array.from(i().subarray(Number(H) >>> 0, Number(X) >>> 0)) : [],
                    w_is_const: ()=>!!t()[Number(ge) >>> 0],
                    activation: Ce(z),
                    activation_params: de ? Array.from(d().subarray(Number(de) >>> 0, Number(Te) >>> 0)) : []
                });
            },
            927834: (s)=>{
                u.kb("Gelu", s, void 0);
            },
            927886: (s, c, f, b, w, I, O, B, L)=>{
                u.kb("GroupQueryAttention", s, {
                    numHeads: c,
                    kvNumHeads: f,
                    scale: b,
                    softcap: w,
                    doRotary: I,
                    rotaryInterleaved: O,
                    smoothSoftmax: B,
                    localWindowSize: L
                });
            },
            928103: (s, c, f, b)=>{
                u.kb("LayerNormalization", s, {
                    axis: c,
                    epsilon: f,
                    simplified: !!b
                });
            },
            928214: (s, c, f, b)=>{
                u.kb("LayerNormalization", s, {
                    axis: c,
                    epsilon: f,
                    simplified: !!b
                });
            },
            928325: (s, c, f, b, w, I)=>{
                u.kb("MatMulNBits", s, {
                    k: c,
                    n: f,
                    accuracyLevel: b,
                    bits: w,
                    blockSize: I
                });
            },
            928452: (s, c, f, b, w, I)=>{
                u.kb("MultiHeadAttention", s, {
                    numHeads: c,
                    isUnidirectional: f,
                    maskFilterValue: b,
                    scale: w,
                    doRotary: I
                });
            },
            928611: (s, c)=>{
                u.kb("QuickGelu", s, {
                    alpha: c
                });
            },
            928675: (s, c, f, b, w)=>{
                u.kb("RotaryEmbedding", s, {
                    interleaved: !!c,
                    numHeads: f,
                    rotaryEmbeddingDim: b,
                    scale: w
                });
            },
            928814: (s, c, f)=>{
                u.kb("SkipLayerNormalization", s, {
                    epsilon: c,
                    simplified: !!f
                });
            },
            928916: (s, c, f)=>{
                u.kb("SkipLayerNormalization", s, {
                    epsilon: c,
                    simplified: !!f
                });
            },
            929018: (s, c, f, b)=>{
                u.kb("GatherBlockQuantized", s, {
                    gatherAxis: c,
                    quantizeAxis: f,
                    blockSize: b
                });
            },
            929139: (s)=>{
                u.$b(s);
            },
            929173: (s, c)=>u.cc(Number(s), Number(c), u.Gb.hc, u.Gb.errors)
        };
        function vc(s, c, f) {
            return _i(async ()=>{
                await u.Yb(Number(s), Number(c), Number(f));
            });
        }
        function $c() {
            return typeof wasmOffsetConverter < "u";
        }
        function yn(s) {
            this.name = "ExitStatus", this.message = "Program terminated with exit(".concat(s, ")"), this.status = s;
        }
        var _n = (s)=>{
            s.terminate(), s.onmessage = ()=>{};
        }, Vo = (s)=>{
            pt.length == 0 && (qo(), Fo(pt[0]));
            var c = pt.pop();
            if (!c) return 6;
            vt.push(c), Ze[s.Bb] = c, c.Bb = s.Bb;
            var f = {
                cmd: "run",
                start_routine: s.ic,
                arg: s.Rb,
                pthread_ptr: s.Bb
            };
            return c.postMessage(f, s.nc), 0;
        }, wt = 0, xe = function(s, c) {
            for(var _len = arguments.length, f = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
                f[_key - 2] = arguments[_key];
            }
            for(var b = 2 * f.length, w = Rn(), I = Mn(8 * b), O = I >>> 3, B = 0; B < f.length; B++){
                var L = f[B];
                typeof L == "bigint" ? (q[O + 2 * B] = 1n, q[O + 2 * B + 1] = L) : (q[O + 2 * B] = 0n, l()[O + 2 * B + 1 >>> 0] = L);
            }
            return s = Gi(s, 0, b, I, c), gr(w), s;
        };
        function wn(s) {
            if (g) return xe(0, 1, s);
            if (ee = s, !(0 < wt)) {
                for (var c of vt)_n(c);
                for (c of pt)_n(c);
                pt = [], vt = [], Ze = [], we = !0;
            }
            k(s, new yn(s));
        }
        function Wo(s) {
            if (g) return xe(1, 0, s);
            vn(s);
        }
        var vn = (s)=>{
            if (ee = s, g) throw Wo(s), "unwind";
            wn(s);
        }, pt = [], vt = [], Lo = [], Ze = {}, Go = (s)=>{
            var c = s.Bb;
            delete Ze[c], pt.push(s), vt.splice(vt.indexOf(s), 1), s.Bb = 0, Bn(c);
        };
        function Ho() {
            Lo.forEach((s)=>s());
        }
        var Fo = (s)=>new Promise((c)=>{
                s.onmessage = (w)=>{
                    var I = (w = w.data).cmd;
                    if (w.targetThread && w.targetThread != Mt()) {
                        var O = Ze[w.targetThread];
                        O ? O.postMessage(w, w.transferList) : j('Internal error! Worker sent a message "'.concat(I, '" to target pthread ').concat(w.targetThread, ", but that thread no longer exists!"));
                    } else I === "checkMailbox" ? ir() : I === "spawnThread" ? Vo(w) : I === "cleanupThread" ? Go(Ze[w.thread]) : I === "killThread" ? (w = w.thread, I = Ze[w], delete Ze[w], _n(I), Bn(w), vt.splice(vt.indexOf(I), 1), I.Bb = 0) : I === "cancelThread" ? Ze[w.thread].postMessage({
                        cmd: "cancel"
                    }) : I === "loaded" ? (s.loaded = !0, c(s)) : I === "alert" ? alert("Thread ".concat(w.threadId, ": ").concat(w.text)) : w.target === "setimmediate" ? s.postMessage(w) : I === "callHandler" ? u[w.handler](...w.args) : I && j("worker sent an unknown command ".concat(I));
                }, s.onerror = (w)=>{
                    throw j("worker sent an error! ".concat(w.filename, ":").concat(w.lineno, ": ").concat(w.message)), w;
                };
                var f, b = [];
                for (f of [])u.hasOwnProperty(f) && b.push(f);
                s.postMessage({
                    cmd: "load",
                    handlers: b,
                    wasmMemory: se,
                    wasmModule: Y
                });
            });
        function qo() {
            var s = new Worker(import.meta.url.startsWith("file:") ? new URL("ort.webgpu.bundle.min.mjs", import.meta.url) : new URL(import.meta.url), {
                type: "module",
                workerData: "em-pthread",
                name: "em-pthread"
            });
            pt.push(s);
        }
        var or = (s)=>{
            for(; 0 < s.length;)s.shift()(u);
        }, xc = ()=>{
            var s = Mt(), c = a()[s + 52 >>> 2 >>> 0];
            s = a()[s + 56 >>> 2 >>> 0], Fi(c, c - s), gr(c);
        }, Sc = (s, c)=>{
            wt = 0, s = qi(s, c), 0 < wt ? ee = s : hr(s);
        };
        class Tc {
            constructor(c){
                this.Kb = c - 24;
            }
        }
        function Ic(s, c, f) {
            var b = new Tc(s >>>= 0);
            throw c >>>= 0, f >>>= 0, a()[b.Kb + 16 >>> 2 >>> 0] = 0, a()[b.Kb + 4 >>> 2 >>> 0] = c, a()[b.Kb + 8 >>> 2 >>> 0] = f, s;
        }
        function Ko(s, c, f, b) {
            return g ? xe(2, 1, s, c, f, b) : jo(s, c, f, b);
        }
        function jo(s, c, f, b) {
            if (s >>>= 0, c >>>= 0, f >>>= 0, b >>>= 0, x === void 0) return j("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;
            var w = [];
            return g && w.length === 0 ? Ko(s, c, f, b) : (s = {
                ic: f,
                Bb: s,
                Rb: b,
                nc: w
            }, g ? (s.Nb = "spawnThread", postMessage(s, w), 0) : Vo(s));
        }
        var Yo = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0, Zo = (s, c, f)=>{
            var b = (c >>>= 0) + f;
            for(f = c; s[f] && !(f >= b);)++f;
            if (16 < f - c && s.buffer && Yo) return Yo.decode(s.buffer instanceof x ? s.slice(c, f) : s.subarray(c, f));
            for(b = ""; c < f;){
                var w = s[c++];
                if (128 & w) {
                    var I = 63 & s[c++];
                    if ((224 & w) == 192) b += String.fromCharCode((31 & w) << 6 | I);
                    else {
                        var O = 63 & s[c++];
                        65536 > (w = (240 & w) == 224 ? (15 & w) << 12 | I << 6 | O : (7 & w) << 18 | I << 12 | O << 6 | 63 & s[c++]) ? b += String.fromCharCode(w) : (w -= 65536, b += String.fromCharCode(55296 | w >> 10, 56320 | 1023 & w));
                    }
                } else b += String.fromCharCode(w);
            }
            return b;
        }, Ce = (s, c)=>(s >>>= 0) ? Zo(r(), s, c) : "";
        function Qo(s, c, f) {
            return g ? xe(3, 1, s, c, f) : 0;
        }
        function Xo(s, c) {
            if (g) return xe(4, 1, s, c);
        }
        var $n = (s)=>{
            for(var c = 0, f = 0; f < s.length; ++f){
                var b = s.charCodeAt(f);
                127 >= b ? c++ : 2047 >= b ? c += 2 : 55296 <= b && 57343 >= b ? (c += 4, ++f) : c += 3;
            }
            return c;
        }, Jo = (s, c, f, b)=>{
            if (!(0 < b)) return 0;
            var w = f >>>= 0;
            b = f + b - 1;
            for(var I = 0; I < s.length; ++I){
                var O = s.charCodeAt(I);
                if (55296 <= O && 57343 >= O && (O = 65536 + ((1023 & O) << 10) | 1023 & s.charCodeAt(++I)), 127 >= O) {
                    if (f >= b) break;
                    c[f++ >>> 0] = O;
                } else {
                    if (2047 >= O) {
                        if (f + 1 >= b) break;
                        c[f++ >>> 0] = 192 | O >> 6;
                    } else {
                        if (65535 >= O) {
                            if (f + 2 >= b) break;
                            c[f++ >>> 0] = 224 | O >> 12;
                        } else {
                            if (f + 3 >= b) break;
                            c[f++ >>> 0] = 240 | O >> 18, c[f++ >>> 0] = 128 | O >> 12 & 63;
                        }
                        c[f++ >>> 0] = 128 | O >> 6 & 63;
                    }
                    c[f++ >>> 0] = 128 | 63 & O;
                }
            }
            return c[f >>> 0] = 0, f - w;
        }, Ot = (s, c, f)=>Jo(s, r(), c, f);
        function ei(s, c) {
            if (g) return xe(5, 1, s, c);
        }
        function ti(s, c, f) {
            if (g) return xe(6, 1, s, c, f);
        }
        function ri(s, c, f) {
            return g ? xe(7, 1, s, c, f) : 0;
        }
        function ni(s, c) {
            if (g) return xe(8, 1, s, c);
        }
        function oi(s, c, f) {
            if (g) return xe(9, 1, s, c, f);
        }
        function ii(s, c, f, b) {
            if (g) return xe(10, 1, s, c, f, b);
        }
        function ai(s, c, f, b) {
            if (g) return xe(11, 1, s, c, f, b);
        }
        function si(s, c, f, b) {
            if (g) return xe(12, 1, s, c, f, b);
        }
        function ui(s) {
            if (g) return xe(13, 1, s);
        }
        function di(s, c) {
            if (g) return xe(14, 1, s, c);
        }
        function li(s, c, f) {
            if (g) return xe(15, 1, s, c, f);
        }
        var ci, mt, Cc = ()=>{
            ct("");
        }, Qe = (s)=>{
            for(var c = ""; r()[s >>> 0];)c += ci[r()[s++ >>> 0]];
            return c;
        }, xn = {}, Sn = {}, Ac = {};
        function st(s, c) {
            let f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
            if (!("argPackAdvance" in c)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
            return function(b, w) {
                let I = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var O = w.name;
                if (!b) throw new mt('type "'.concat(O, '" must have a positive integer typeid pointer'));
                if (Sn.hasOwnProperty(b)) {
                    if (I.Tb) return;
                    throw new mt("Cannot register type '".concat(O, "' twice"));
                }
                Sn[b] = w, delete Ac[b], xn.hasOwnProperty(b) && (w = xn[b], delete xn[b], w.forEach((B)=>B()));
            }(s, c, f);
        }
        var pi = (s, c, f)=>{
            switch(c){
                case 1:
                    return f ? (b)=>t()[b >>> 0] : (b)=>r()[b >>> 0];
                case 2:
                    return f ? (b)=>n()[b >>> 1 >>> 0] : (b)=>o()[b >>> 1 >>> 0];
                case 4:
                    return f ? (b)=>i()[b >>> 2 >>> 0] : (b)=>a()[b >>> 2 >>> 0];
                case 8:
                    return f ? (b)=>q[b >>> 3] : (b)=>he[b >>> 3];
                default:
                    throw new TypeError("invalid integer width (".concat(c, "): ").concat(s));
            }
        };
        function kc(s, c, f) {
            f >>>= 0, st(s >>>= 0, {
                name: c = Qe(c >>> 0),
                fromWireType: (b)=>b,
                toWireType: function(b, w) {
                    if (typeof w != "bigint" && typeof w != "number") throw w = w === null ? "null" : (b = typeof w) == "object" || b === "array" || b === "function" ? w.toString() : "" + w, new TypeError('Cannot convert "'.concat(w, '" to ').concat(this.name));
                    return typeof w == "number" && (w = BigInt(w)), w;
                },
                argPackAdvance: ft,
                readValueFromPointer: pi(c, f, c.indexOf("u") == -1),
                Eb: null
            });
        }
        var ft = 8;
        function Ec(s, c, f, b) {
            st(s >>>= 0, {
                name: c = Qe(c >>> 0),
                fromWireType: function(w) {
                    return !!w;
                },
                toWireType: function(w, I) {
                    return I ? f : b;
                },
                argPackAdvance: ft,
                readValueFromPointer: function(w) {
                    return this.fromWireType(r()[w >>> 0]);
                },
                Eb: null
            });
        }
        var Tn = [], ut = [];
        function In(s) {
            9 < (s >>>= 0) && --ut[s + 1] == 0 && (ut[s] = void 0, Tn.push(s));
        }
        var Me = (s)=>{
            if (!s) throw new mt("Cannot use deleted val. handle = " + s);
            return ut[s];
        }, Ve = (s)=>{
            switch(s){
                case void 0:
                    return 2;
                case null:
                    return 4;
                case !0:
                    return 6;
                case !1:
                    return 8;
                default:
                    let c = Tn.pop() || ut.length;
                    return ut[c] = s, ut[c + 1] = 1, c;
            }
        };
        function Cn(s) {
            return this.fromWireType(a()[s >>> 2 >>> 0]);
        }
        var Pc = {
            name: "emscripten::val",
            fromWireType: (s)=>{
                var c = Me(s);
                return In(s), c;
            },
            toWireType: (s, c)=>Ve(c),
            argPackAdvance: ft,
            readValueFromPointer: Cn,
            Eb: null
        };
        function zc(s) {
            return st(s >>> 0, Pc);
        }
        var Oc = (s, c)=>{
            switch(c){
                case 4:
                    return function(f) {
                        return this.fromWireType(d()[f >>> 2 >>> 0]);
                    };
                case 8:
                    return function(f) {
                        return this.fromWireType(l()[f >>> 3 >>> 0]);
                    };
                default:
                    throw new TypeError("invalid float width (".concat(c, "): ").concat(s));
            }
        };
        function Dc(s, c, f) {
            f >>>= 0, st(s >>>= 0, {
                name: c = Qe(c >>> 0),
                fromWireType: (b)=>b,
                toWireType: (b, w)=>w,
                argPackAdvance: ft,
                readValueFromPointer: Oc(c, f),
                Eb: null
            });
        }
        function Bc(s, c, f, b, w) {
            if (s >>>= 0, f >>>= 0, c = Qe(c >>> 0), w === -1 && (w = 4294967295), w = (B)=>B, b === 0) {
                var I = 32 - 8 * f;
                w = (B)=>B << I >>> I;
            }
            var O = c.includes("unsigned") ? function(B, L) {
                return L >>> 0;
            } : function(B, L) {
                return L;
            };
            st(s, {
                name: c,
                fromWireType: w,
                toWireType: O,
                argPackAdvance: ft,
                readValueFromPointer: pi(c, f, b !== 0),
                Eb: null
            });
        }
        function Mc(s, c, f) {
            function b(I) {
                var O = a()[I >>> 2 >>> 0];
                return I = a()[I + 4 >>> 2 >>> 0], new w(t().buffer, I, O);
            }
            var w = [
                Int8Array,
                Uint8Array,
                Int16Array,
                Uint16Array,
                Int32Array,
                Uint32Array,
                Float32Array,
                Float64Array,
                BigInt64Array,
                BigUint64Array
            ][c];
            st(s >>>= 0, {
                name: f = Qe(f >>> 0),
                fromWireType: b,
                argPackAdvance: ft,
                readValueFromPointer: b
            }, {
                Tb: !0
            });
        }
        function Rc(s, c) {
            s >>>= 0;
            var f = (c = Qe(c >>> 0)) === "std::string";
            st(s, {
                name: c,
                fromWireType: function(b) {
                    var w = a()[b >>> 2 >>> 0], I = b + 4;
                    if (f) for(var O = I, B = 0; B <= w; ++B){
                        var L = I + B;
                        if (B == w || r()[L >>> 0] == 0) {
                            if (O = Ce(O, L - O), H === void 0) var H = O;
                            else H += String.fromCharCode(0), H += O;
                            O = L + 1;
                        }
                    }
                    else {
                        for(H = Array(w), B = 0; B < w; ++B)H[B] = String.fromCharCode(r()[I + B >>> 0]);
                        H = H.join("");
                    }
                    return Je(b), H;
                },
                toWireType: function(b, w) {
                    w instanceof ArrayBuffer && (w = new Uint8Array(w));
                    var I = typeof w == "string";
                    if (!(I || w instanceof Uint8Array || w instanceof Uint8ClampedArray || w instanceof Int8Array)) throw new mt("Cannot pass non-string to std::string");
                    var O = f && I ? $n(w) : w.length, B = fr(4 + O + 1), L = B + 4;
                    if (a()[B >>> 2 >>> 0] = O, f && I) Ot(w, L, O + 1);
                    else if (I) for(I = 0; I < O; ++I){
                        var H = w.charCodeAt(I);
                        if (255 < H) throw Je(L), new mt("String has UTF-16 code units that do not fit in 8 bits");
                        r()[L + I >>> 0] = H;
                    }
                    else for(I = 0; I < O; ++I)r()[L + I >>> 0] = w[I];
                    return b !== null && b.push(Je, B), B;
                },
                argPackAdvance: ft,
                readValueFromPointer: Cn,
                Eb (b) {
                    Je(b);
                }
            });
        }
        var mi = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0, Uc = (s, c)=>{
            for(var f = s >> 1, b = f + c / 2; !(f >= b) && o()[f >>> 0];)++f;
            if (32 < (f <<= 1) - s && mi) return mi.decode(r().slice(s, f));
            for(f = "", b = 0; !(b >= c / 2); ++b){
                var w = n()[s + 2 * b >>> 1 >>> 0];
                if (w == 0) break;
                f += String.fromCharCode(w);
            }
            return f;
        }, Nc = (s, c, f)=>{
            if (f !== null && f !== void 0 ? f : f = 2147483647, 2 > f) return 0;
            var b = c;
            f = (f -= 2) < 2 * s.length ? f / 2 : s.length;
            for(var w = 0; w < f; ++w){
                var I = s.charCodeAt(w);
                n()[c >>> 1 >>> 0] = I, c += 2;
            }
            return n()[c >>> 1 >>> 0] = 0, c - b;
        }, Vc = (s)=>2 * s.length, Wc = (s, c)=>{
            for(var f = 0, b = ""; !(f >= c / 4);){
                var w = i()[s + 4 * f >>> 2 >>> 0];
                if (w == 0) break;
                ++f, 65536 <= w ? (w -= 65536, b += String.fromCharCode(55296 | w >> 10, 56320 | 1023 & w)) : b += String.fromCharCode(w);
            }
            return b;
        }, Lc = (s, c, f)=>{
            if (c >>>= 0, f !== null && f !== void 0 ? f : f = 2147483647, 4 > f) return 0;
            var b = c;
            f = b + f - 4;
            for(var w = 0; w < s.length; ++w){
                var I = s.charCodeAt(w);
                if (55296 <= I && 57343 >= I && (I = 65536 + ((1023 & I) << 10) | 1023 & s.charCodeAt(++w)), i()[c >>> 2 >>> 0] = I, (c += 4) + 4 > f) break;
            }
            return i()[c >>> 2 >>> 0] = 0, c - b;
        }, Gc = (s)=>{
            for(var c = 0, f = 0; f < s.length; ++f){
                var b = s.charCodeAt(f);
                55296 <= b && 57343 >= b && ++f, c += 4;
            }
            return c;
        };
        function Hc(s, c, f) {
            if (s >>>= 0, c >>>= 0, f = Qe(f >>>= 0), c === 2) var b = Uc, w = Nc, I = Vc, O = (B)=>o()[B >>> 1 >>> 0];
            else c === 4 && (b = Wc, w = Lc, I = Gc, O = (B)=>a()[B >>> 2 >>> 0]);
            st(s, {
                name: f,
                fromWireType: (B)=>{
                    for(var L, H = a()[B >>> 2 >>> 0], X = B + 4, ce = 0; ce <= H; ++ce){
                        var ge = B + 4 + ce * c;
                        ce != H && O(ge) != 0 || (X = b(X, ge - X), L === void 0 ? L = X : (L += String.fromCharCode(0), L += X), X = ge + c);
                    }
                    return Je(B), L;
                },
                toWireType: (B, L)=>{
                    if (typeof L != "string") throw new mt("Cannot pass non-string to C++ string type ".concat(f));
                    var H = I(L), X = fr(4 + H + c);
                    return a()[X >>> 2 >>> 0] = H / c, w(L, X + 4, H + c), B !== null && B.push(Je, X), X;
                },
                argPackAdvance: ft,
                readValueFromPointer: Cn,
                Eb (B) {
                    Je(B);
                }
            });
        }
        function Fc(s, c) {
            st(s >>>= 0, {
                Ub: !0,
                name: c = Qe(c >>> 0),
                argPackAdvance: 0,
                fromWireType: ()=>{},
                toWireType: ()=>{}
            });
        }
        var qc = ()=>1;
        function Kc(s) {
            Dn(s >>> 0, !y, 1, !_, 131072, !1), Ho();
        }
        var fi = (s)=>{
            if (!we) try {
                if (s(), !(0 < wt)) try {
                    g ? hr(ee) : vn(ee);
                } catch (c) {
                    c instanceof yn || c == "unwind" || k(1, c);
                }
            } catch (c) {
                c instanceof yn || c == "unwind" || k(1, c);
            }
        };
        function An(s) {
            s >>>= 0, typeof Atomics.oc == "function" && (Atomics.oc(i(), s >>> 2, s).value.then(ir), s += 128, Atomics.store(i(), s >>> 2, 1));
        }
        var ir = ()=>{
            var s = Mt();
            s && (An(s), fi(Hi));
        };
        function jc(s, c) {
            (s >>>= 0) == c >>> 0 ? setTimeout(ir) : g ? postMessage({
                targetThread: s,
                cmd: "checkMailbox"
            }) : (s = Ze[s]) && s.postMessage({
                cmd: "checkMailbox"
            });
        }
        var kn = [];
        function Yc(s, c, f, b, w) {
            for(c >>>= 0, b /= 2, kn.length = b, f = w >>> 0 >>> 3, w = 0; w < b; w++)kn[w] = q[f + 2 * w] ? q[f + 2 * w + 1] : l()[f + 2 * w + 1 >>> 0];
            return (c ? bn[c] : Np[s])(...kn);
        }
        function Zc(s) {
            s >>>= 0, g ? postMessage({
                cmd: "cleanupThread",
                thread: s
            }) : Go(Ze[s]);
        }
        function Qc(s) {}
        var ar = (s, c)=>{
            var f = Sn[s];
            if (f === void 0) throw s = Vi(s), f = Qe(s), Je(s), new mt("".concat(c, " has unknown type ").concat(f));
            return f;
        }, hi = (s, c, f)=>{
            var b = [];
            return s = s.toWireType(b, f), b.length && (a()[c >>> 2 >>> 0] = Ve(b)), s;
        };
        function Xc(s, c, f) {
            return c >>>= 0, f >>>= 0, s = Me(s >>> 0), c = ar(c, "emval::as"), hi(c, f, s);
        }
        function Jc(s, c) {
            return c >>>= 0, s = Me(s >>> 0), (c = ar(c, "emval::as")).toWireType(null, s);
        }
        var sr = (s)=>{
            try {
                s();
            } catch (c) {
                ct(c);
            }
        }, ht = 0, Xe = null, gi = 0, ur = [], bi = {}, yi = {}, ep = 0, En = null, tp = [];
        function _i(s) {
            return function(c) {
                if (!we) {
                    if (ht === 0) {
                        var f = !1, b = !1;
                        c(function() {
                            let w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
                            if (!we && (gi = w, f = !0, b)) {
                                ht = 2, sr(()=>Yi(Xe)), typeof Browser < "u" && Browser.Lb.Sb && Browser.Lb.resume(), w = !1;
                                try {
                                    var I = function() {
                                        var L = i()[Xe + 8 >>> 2 >>> 0];
                                        return L = Z[yi[L]], --wt, L();
                                    }();
                                } catch (L) {
                                    I = L, w = !0;
                                }
                                var O = !1;
                                if (!Xe) {
                                    var B = En;
                                    B && (En = null, (w ? B.reject : B.resolve)(I), O = !0);
                                }
                                if (w && !O) throw I;
                            }
                        }), b = !0, f || (ht = 1, Xe = function() {
                            var w = fr(65548), I = w + 12;
                            a()[w >>> 2 >>> 0] = I, a()[w + 4 >>> 2 >>> 0] = I + 65536, I = ur[0];
                            var O = bi[I];
                            return O === void 0 && (O = ep++, bi[I] = O, yi[O] = I), I = O, i()[w + 8 >>> 2 >>> 0] = I, w;
                        }(), typeof Browser < "u" && Browser.Lb.Sb && Browser.Lb.pause(), sr(()=>Ki(Xe)));
                    } else ht === 2 ? (ht = 0, sr(Zi), Je(Xe), Xe = null, tp.forEach(fi)) : ct("invalid state: ".concat(ht));
                    return gi;
                }
            }((c)=>{
                s().then(c);
            });
        }
        function rp(s) {
            return s >>>= 0, _i(()=>(s = Me(s)).then(Ve));
        }
        var dr = [];
        function np(s, c, f, b) {
            return f >>>= 0, b >>>= 0, (s = dr[s >>> 0])(null, c = Me(c >>> 0), f, b);
        }
        var op = {}, lr = (s)=>{
            var c = op[s];
            return c === void 0 ? Qe(s) : c;
        };
        function ip(s, c, f, b, w) {
            return f >>>= 0, b >>>= 0, w >>>= 0, (s = dr[s >>> 0])(c = Me(c >>> 0), c[f = lr(f)], b, w);
        }
        var wi = ()=>typeof globalThis == "object" ? globalThis : Function("return this")();
        function ap(s) {
            return (s >>>= 0) == 0 ? Ve(wi()) : (s = lr(s), Ve(wi()[s]));
        }
        var sp = (s)=>{
            var c = dr.length;
            return dr.push(s), c;
        }, up = (s, c)=>{
            for(var f = Array(s), b = 0; b < s; ++b)f[b] = ar(a()[c + 4 * b >>> 2 >>> 0], "parameter " + b);
            return f;
        }, vi = (s, c)=>Object.defineProperty(c, "name", {
                value: s
            });
        function dp(s, c, f) {
            var b = (c = up(s, c >>> 0)).shift();
            s--;
            var w = "return function (obj, func, destructorsRef, args) {\n", I = 0, O = [];
            f === 0 && O.push("obj");
            for(var B = [
                "retType"
            ], L = [
                b
            ], H = 0; H < s; ++H)O.push("arg" + H), B.push("argType" + H), L.push(c[H]), w += "  var arg".concat(H, " = argType").concat(H, ".readValueFromPointer(args").concat(I ? "+" + I : "", ");\n"), I += c[H].argPackAdvance;
            return w += "  var rv = ".concat(f === 1 ? "new func" : "func.call", "(").concat(O.join(", "), ");\n"), b.Ub || (B.push("emval_returnValue"), L.push(hi), w += "  return emval_returnValue(retType, destructorsRef, rv);\n"), B.push(w + "};\n"), s = (function(X) {
                var ce = Function;
                if (!(ce instanceof Function)) throw new TypeError("new_ called with constructor type ".concat(typeof ce, " which is not a function"));
                var ge = vi(ce.name || "unknownFunctionName", function() {});
                return ge.prototype = ce.prototype, ge = new ge, (X = ce.apply(ge, X)) instanceof Object ? X : ge;
            })(B)(...L), f = "methodCaller<(".concat(c.map((X)=>X.name).join(", "), ") => ").concat(b.name, ">"), sp(vi(f, s));
        }
        function lp(s) {
            return s = lr(s >>> 0), Ve(u[s]);
        }
        function cp(s, c) {
            return c >>>= 0, s = Me(s >>> 0), c = Me(c), Ve(s[c]);
        }
        function pp(s) {
            9 < (s >>>= 0) && (ut[s + 1] += 1);
        }
        function mp() {
            return Ve([]);
        }
        function fp(s) {
            s = Me(s >>> 0);
            for(var c = Array(s.length), f = 0; f < s.length; f++)c[f] = s[f];
            return Ve(c);
        }
        function hp(s) {
            return Ve(lr(s >>> 0));
        }
        function gp() {
            return Ve({});
        }
        function bp(s) {
            for(var c = Me(s >>>= 0); c.length;){
                var f = c.pop();
                c.pop()(f);
            }
            In(s);
        }
        function yp(s, c, f) {
            c >>>= 0, f >>>= 0, s = Me(s >>> 0), c = Me(c), f = Me(f), s[c] = f;
        }
        function _p(s, c) {
            return c >>>= 0, s = (s = ar(s >>> 0, "_emval_take_value")).readValueFromPointer(c), Ve(s);
        }
        function wp(s, c) {
            s = -9007199254740992 > s || 9007199254740992 < s ? NaN : Number(s), c >>>= 0, s = new Date(1e3 * s), i()[c >>> 2 >>> 0] = s.getUTCSeconds(), i()[c + 4 >>> 2 >>> 0] = s.getUTCMinutes(), i()[c + 8 >>> 2 >>> 0] = s.getUTCHours(), i()[c + 12 >>> 2 >>> 0] = s.getUTCDate(), i()[c + 16 >>> 2 >>> 0] = s.getUTCMonth(), i()[c + 20 >>> 2 >>> 0] = s.getUTCFullYear() - 1900, i()[c + 24 >>> 2 >>> 0] = s.getUTCDay(), s = (s.getTime() - Date.UTC(s.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5 | 0, i()[c + 28 >>> 2 >>> 0] = s;
        }
        var Dt = (s)=>s % 4 == 0 && (s % 100 != 0 || s % 400 == 0), $i = [
            0,
            31,
            60,
            91,
            121,
            152,
            182,
            213,
            244,
            274,
            305,
            335
        ], xi = [
            0,
            31,
            59,
            90,
            120,
            151,
            181,
            212,
            243,
            273,
            304,
            334
        ];
        function vp(s, c) {
            s = -9007199254740992 > s || 9007199254740992 < s ? NaN : Number(s), c >>>= 0, s = new Date(1e3 * s), i()[c >>> 2 >>> 0] = s.getSeconds(), i()[c + 4 >>> 2 >>> 0] = s.getMinutes(), i()[c + 8 >>> 2 >>> 0] = s.getHours(), i()[c + 12 >>> 2 >>> 0] = s.getDate(), i()[c + 16 >>> 2 >>> 0] = s.getMonth(), i()[c + 20 >>> 2 >>> 0] = s.getFullYear() - 1900, i()[c + 24 >>> 2 >>> 0] = s.getDay();
            var f = (Dt(s.getFullYear()) ? $i : xi)[s.getMonth()] + s.getDate() - 1 | 0;
            i()[c + 28 >>> 2 >>> 0] = f, i()[c + 36 >>> 2 >>> 0] = -60 * s.getTimezoneOffset(), f = new Date(s.getFullYear(), 6, 1).getTimezoneOffset();
            var b = new Date(s.getFullYear(), 0, 1).getTimezoneOffset();
            s = 0 | (f != b && s.getTimezoneOffset() == Math.min(b, f)), i()[c + 32 >>> 2 >>> 0] = s;
        }
        function $p(s) {
            s >>>= 0;
            var c = new Date(i()[s + 20 >>> 2 >>> 0] + 1900, i()[s + 16 >>> 2 >>> 0], i()[s + 12 >>> 2 >>> 0], i()[s + 8 >>> 2 >>> 0], i()[s + 4 >>> 2 >>> 0], i()[s >>> 2 >>> 0], 0), f = i()[s + 32 >>> 2 >>> 0], b = c.getTimezoneOffset(), w = new Date(c.getFullYear(), 6, 1).getTimezoneOffset(), I = new Date(c.getFullYear(), 0, 1).getTimezoneOffset(), O = Math.min(I, w);
            return 0 > f ? i()[s + 32 >>> 2 >>> 0] = +(w != I && O == b) : 0 < f != (O == b) && (w = Math.max(I, w), c.setTime(c.getTime() + 6e4 * ((0 < f ? O : w) - b))), i()[s + 24 >>> 2 >>> 0] = c.getDay(), f = (Dt(c.getFullYear()) ? $i : xi)[c.getMonth()] + c.getDate() - 1 | 0, i()[s + 28 >>> 2 >>> 0] = f, i()[s >>> 2 >>> 0] = c.getSeconds(), i()[s + 4 >>> 2 >>> 0] = c.getMinutes(), i()[s + 8 >>> 2 >>> 0] = c.getHours(), i()[s + 12 >>> 2 >>> 0] = c.getDate(), i()[s + 16 >>> 2 >>> 0] = c.getMonth(), i()[s + 20 >>> 2 >>> 0] = c.getYear(), s = c.getTime(), BigInt(isNaN(s) ? -1 : s / 1e3);
        }
        function Si(s, c, f, b, w, I, O) {
            return g ? xe(16, 1, s, c, f, b, w, I, O) : -52;
        }
        function Ti(s, c, f, b, w, I) {
            if (g) return xe(17, 1, s, c, f, b, w, I);
        }
        function xp(s, c, f, b) {
            s >>>= 0, c >>>= 0, f >>>= 0, b >>>= 0;
            var w = new Date().getFullYear(), I = new Date(w, 0, 1), O = new Date(w, 6, 1);
            w = I.getTimezoneOffset();
            var B = O.getTimezoneOffset(), L = Math.max(w, B);
            a()[s >>> 2 >>> 0] = 60 * L, i()[c >>> 2 >>> 0] = +(w != B), I = (s = (H)=>H.toLocaleTimeString(void 0, {
                    hour12: !1,
                    timeZoneName: "short"
                }).split(" ")[1])(I), O = s(O), B < w ? (Ot(I, f, 17), Ot(O, b, 17)) : (Ot(I, b, 17), Ot(O, f, 17));
        }
        var Pn = [], Ii = (s, c)=>{
            Pn.length = 0;
            for(var f; f = r()[s++ >>> 0];){
                var b = f != 105;
                c += (b &= f != 112) && c % 8 ? 4 : 0, Pn.push(f == 112 ? a()[c >>> 2 >>> 0] : f == 106 ? q[c >>> 3] : f == 105 ? i()[c >>> 2 >>> 0] : l()[c >>> 3 >>> 0]), c += b ? 8 : 4;
            }
            return Pn;
        };
        function Sp(s, c, f) {
            return s >>>= 0, c = Ii(c >>> 0, f >>> 0), bn[s](...c);
        }
        function Tp(s, c, f) {
            return s >>>= 0, c = Ii(c >>> 0, f >>> 0), bn[s](...c);
        }
        var Ip = ()=>{}, Cp = ()=>Date.now();
        function Ap(s, c) {
            return j(Ce(s >>> 0, c >>> 0));
        }
        var Ci, kp = ()=>{
            throw wt += 1, "unwind";
        };
        function Ep() {
            return 4294901760;
        }
        Ci = ()=>performance.timeOrigin + performance.now();
        var Pp = ()=>navigator.hardwareConcurrency;
        function zp() {
            return ct("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"), 0;
        }
        function Op(s) {
            s >>>= 0;
            var c = r().length;
            if (s <= c || 4294901760 < s) return !1;
            for(var f = 1; 4 >= f; f *= 2){
                var b = c * (1 + .2 / f);
                b = Math.min(b, s + 100663296);
                var w = Math;
                b = Math.max(s, b);
                e: {
                    w = (w.min.call(w, 4294901760, b + (65536 - b % 65536) % 65536) - se.buffer.byteLength + 65535) / 65536;
                    try {
                        se.grow(w), ye();
                        var I = 1;
                        break e;
                    } catch (e1) {}
                    I = void 0;
                }
                if (I) return !0;
            }
            return !1;
        }
        var cr = ()=>(ct("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"), 0), Bt = {}, Ai = (s)=>{
            s.forEach((c)=>{
                var f = cr();
                f && (Bt[f] = c);
            });
        };
        function Dp() {
            var s = Error().stack.toString().split("\n");
            return s[0] == "Error" && s.shift(), Ai(s), Bt.Qb = cr(), Bt.fc = s, Bt.Qb;
        }
        function Bp(s, c, f) {
            if (s >>>= 0, c >>>= 0, Bt.Qb == s) var b = Bt.fc;
            else (b = Error().stack.toString().split("\n"))[0] == "Error" && b.shift(), Ai(b);
            for(var w = 3; b[w] && cr() != s;)++w;
            for(s = 0; s < f && b[s + w]; ++s)i()[c + 4 * s >>> 2 >>> 0] = cr();
            return s;
        }
        var zn, On = {}, ki = ()=>{
            if (!zn) {
                var s, c = {
                    USER: "web_user",
                    LOGNAME: "web_user",
                    PATH: "/",
                    PWD: "/",
                    HOME: "/home/web_user",
                    LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                    _: A || "./this.program"
                };
                for(s in On)On[s] === void 0 ? delete c[s] : c[s] = On[s];
                var f = [];
                for(s in c)f.push("".concat(s, "=").concat(c[s]));
                zn = f;
            }
            return zn;
        };
        function Ei(s, c) {
            if (g) return xe(18, 1, s, c);
            s >>>= 0, c >>>= 0;
            var f = 0;
            return ki().forEach((b, w)=>{
                var I = c + f;
                for(w = a()[s + 4 * w >>> 2 >>> 0] = I, I = 0; I < b.length; ++I)t()[w++ >>> 0] = b.charCodeAt(I);
                t()[w >>> 0] = 0, f += b.length + 1;
            }), 0;
        }
        function Pi(s, c) {
            if (g) return xe(19, 1, s, c);
            s >>>= 0, c >>>= 0;
            var f = ki();
            a()[s >>> 2 >>> 0] = f.length;
            var b = 0;
            return f.forEach((w)=>b += w.length + 1), a()[c >>> 2 >>> 0] = b, 0;
        }
        function zi(s) {
            return g ? xe(20, 1, s) : 52;
        }
        function Oi(s, c, f, b) {
            return g ? xe(21, 1, s, c, f, b) : 52;
        }
        function Di(s, c, f, b) {
            return g ? xe(22, 1, s, c, f, b) : 70;
        }
        var Mp = [
            null,
            [],
            []
        ];
        function Bi(s, c, f, b) {
            if (g) return xe(23, 1, s, c, f, b);
            c >>>= 0, f >>>= 0, b >>>= 0;
            for(var w = 0, I = 0; I < f; I++){
                var O = a()[c >>> 2 >>> 0], B = a()[c + 4 >>> 2 >>> 0];
                c += 8;
                for(var L = 0; L < B; L++){
                    var H = r()[O + L >>> 0], X = Mp[s];
                    H === 0 || H === 10 ? ((s === 1 ? K : j)(Zo(X, 0)), X.length = 0) : X.push(H);
                }
                w += B;
            }
            return a()[b >>> 2 >>> 0] = w, 0;
        }
        var Mi = [
            31,
            29,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ], Ri = [
            31,
            28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ], Rp = (s, c)=>{
            t().set(s, c >>> 0);
        };
        function Ui(s, c, f, b) {
            function w(z, de, Te) {
                for(z = typeof z == "number" ? z.toString() : z || ""; z.length < de;)z = Te[0] + z;
                return z;
            }
            function I(z, de) {
                return w(z, de, "0");
            }
            function O(z, de) {
                function Te(Xi) {
                    return 0 > Xi ? -1 : 0 < Xi ? 1 : 0;
                }
                var $t;
                return ($t = Te(z.getFullYear() - de.getFullYear())) === 0 && ($t = Te(z.getMonth() - de.getMonth())) === 0 && ($t = Te(z.getDate() - de.getDate())), $t;
            }
            function B(z) {
                switch(z.getDay()){
                    case 0:
                        return new Date(z.getFullYear() - 1, 11, 29);
                    case 1:
                        return z;
                    case 2:
                        return new Date(z.getFullYear(), 0, 3);
                    case 3:
                        return new Date(z.getFullYear(), 0, 2);
                    case 4:
                        return new Date(z.getFullYear(), 0, 1);
                    case 5:
                        return new Date(z.getFullYear() - 1, 11, 31);
                    case 6:
                        return new Date(z.getFullYear() - 1, 11, 30);
                }
            }
            function L(z) {
                var de = z.Cb;
                for(z = new Date(new Date(z.Db + 1900, 0, 1).getTime()); 0 < de;){
                    var Te = z.getMonth(), $t = (Dt(z.getFullYear()) ? Mi : Ri)[Te];
                    if (!(de > $t - z.getDate())) {
                        z.setDate(z.getDate() + de);
                        break;
                    }
                    de -= $t - z.getDate() + 1, z.setDate(1), 11 > Te ? z.setMonth(Te + 1) : (z.setMonth(0), z.setFullYear(z.getFullYear() + 1));
                }
                return Te = new Date(z.getFullYear() + 1, 0, 4), de = B(new Date(z.getFullYear(), 0, 4)), Te = B(Te), 0 >= O(de, z) ? 0 >= O(Te, z) ? z.getFullYear() + 1 : z.getFullYear() : z.getFullYear() - 1;
            }
            s >>>= 0, c >>>= 0, f >>>= 0, b >>>= 0;
            var H = a()[b + 40 >>> 2 >>> 0];
            for(var X in b = {
                lc: i()[b >>> 2 >>> 0],
                kc: i()[b + 4 >>> 2 >>> 0],
                Ib: i()[b + 8 >>> 2 >>> 0],
                Mb: i()[b + 12 >>> 2 >>> 0],
                Jb: i()[b + 16 >>> 2 >>> 0],
                Db: i()[b + 20 >>> 2 >>> 0],
                vb: i()[b + 24 >>> 2 >>> 0],
                Cb: i()[b + 28 >>> 2 >>> 0],
                sc: i()[b + 32 >>> 2 >>> 0],
                jc: i()[b + 36 >>> 2 >>> 0],
                mc: H ? Ce(H) : ""
            }, f = Ce(f), H = {
                "%c": "%a %b %d %H:%M:%S %Y",
                "%D": "%m/%d/%y",
                "%F": "%Y-%m-%d",
                "%h": "%b",
                "%r": "%I:%M:%S %p",
                "%R": "%H:%M",
                "%T": "%H:%M:%S",
                "%x": "%m/%d/%y",
                "%X": "%H:%M:%S",
                "%Ec": "%c",
                "%EC": "%C",
                "%Ex": "%m/%d/%y",
                "%EX": "%H:%M:%S",
                "%Ey": "%y",
                "%EY": "%Y",
                "%Od": "%d",
                "%Oe": "%e",
                "%OH": "%H",
                "%OI": "%I",
                "%Om": "%m",
                "%OM": "%M",
                "%OS": "%S",
                "%Ou": "%u",
                "%OU": "%U",
                "%OV": "%V",
                "%Ow": "%w",
                "%OW": "%W",
                "%Oy": "%y"
            })f = f.replace(new RegExp(X, "g"), H[X]);
            var ce = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), ge = "January February March April May June July August September October November December".split(" ");
            for(X in H = {
                "%a": (z)=>ce[z.vb].substring(0, 3),
                "%A": (z)=>ce[z.vb],
                "%b": (z)=>ge[z.Jb].substring(0, 3),
                "%B": (z)=>ge[z.Jb],
                "%C": (z)=>I((z.Db + 1900) / 100 | 0, 2),
                "%d": (z)=>I(z.Mb, 2),
                "%e": (z)=>w(z.Mb, 2, " "),
                "%g": (z)=>L(z).toString().substring(2),
                "%G": L,
                "%H": (z)=>I(z.Ib, 2),
                "%I": (z)=>((z = z.Ib) == 0 ? z = 12 : 12 < z && (z -= 12), I(z, 2)),
                "%j": (z)=>{
                    for(var de = 0, Te = 0; Te <= z.Jb - 1; de += (Dt(z.Db + 1900) ? Mi : Ri)[Te++]);
                    return I(z.Mb + de, 3);
                },
                "%m": (z)=>I(z.Jb + 1, 2),
                "%M": (z)=>I(z.kc, 2),
                "%n": ()=>"\n",
                "%p": (z)=>0 <= z.Ib && 12 > z.Ib ? "AM" : "PM",
                "%S": (z)=>I(z.lc, 2),
                "%t": ()=>"	",
                "%u": (z)=>z.vb || 7,
                "%U": (z)=>I(Math.floor((z.Cb + 7 - z.vb) / 7), 2),
                "%V": (z)=>{
                    var de = Math.floor((z.Cb + 7 - (z.vb + 6) % 7) / 7);
                    if (2 >= (z.vb + 371 - z.Cb - 2) % 7 && de++, de) de == 53 && ((Te = (z.vb + 371 - z.Cb) % 7) == 4 || Te == 3 && Dt(z.Db) || (de = 1));
                    else {
                        de = 52;
                        var Te = (z.vb + 7 - z.Cb - 1) % 7;
                        (Te == 4 || Te == 5 && Dt(z.Db % 400 - 1)) && de++;
                    }
                    return I(de, 2);
                },
                "%w": (z)=>z.vb,
                "%W": (z)=>I(Math.floor((z.Cb + 7 - (z.vb + 6) % 7) / 7), 2),
                "%y": (z)=>(z.Db + 1900).toString().substring(2),
                "%Y": (z)=>z.Db + 1900,
                "%z": (z)=>{
                    var de = 0 <= (z = z.jc);
                    return z = Math.abs(z) / 60, (de ? "+" : "-") + ("0000" + (z / 60 * 100 + z % 60)).slice(-4);
                },
                "%Z": (z)=>z.mc,
                "%%": ()=>"%"
            }, f = f.replace(/%%/g, "\x00\x00"), H)f.includes(X) && (f = f.replace(new RegExp(X, "g"), H[X](b)));
            return X = function(z) {
                var de = Array($n(z) + 1);
                return Jo(z, de, 0, de.length), de;
            }(f = f.replace(/\0\0/g, "%")), X.length > c ? 0 : (Rp(X, s), X.length - 1);
        }
        function Up(s, c, f, b) {
            return Ui(s >>> 0, c >>> 0, f >>> 0, b >>> 0);
        }
        g || function() {
            for(var s = u.numThreads - 1; s--;)qo();
            Ye.unshift(()=>{
                Gt++, function(c) {
                    g ? c() : Promise.all(pt.map(Fo)).then(c);
                }(()=>Do());
            });
        }();
        for(var Ni = Array(256), pr = 0; 256 > pr; ++pr)Ni[pr] = String.fromCharCode(pr);
        ci = Ni, mt = u.BindingError = class extends Error {
            constructor(s){
                super(s), this.name = "BindingError";
            }
        }, u.InternalError = class extends Error {
            constructor(s){
                super(s), this.name = "InternalError";
            }
        }, ut.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1), u.count_emval_handles = ()=>ut.length / 2 - 5 - Tn.length;
        var Np = [
            wn,
            Wo,
            Ko,
            Qo,
            Xo,
            ei,
            ti,
            ri,
            ni,
            oi,
            ii,
            ai,
            si,
            ui,
            di,
            li,
            Si,
            Ti,
            Ei,
            Pi,
            zi,
            Oi,
            Di,
            Bi
        ], Z = function() {
            function s(f, b) {
                return Z = f.exports, Z = function() {
                    var w = Z, I = {};
                    for (let [O, B] of Object.entries(w))I[O] = typeof B == "function" ? function() {
                        for(var _len = arguments.length, L = new Array(_len), _key = 0; _key < _len; _key++){
                            L[_key] = arguments[_key];
                        }
                        ur.push(O);
                        try {
                            return B(...L);
                        } finally{
                            we || (ur.pop(), Xe && ht === 1 && ur.length === 0 && (ht = 0, wt += 1, sr(ji), typeof Fibers < "u" && Fibers.tc()));
                        }
                    } : B;
                    return I;
                }(), Z = function() {
                    var w = Z, I = (B)=>(L)=>B(L) >>> 0, O = (B)=>()=>B() >>> 0;
                    return (w = Object.assign({}, w)).Da = I(w.Da), w.gb = O(w.gb), w.ib = I(w.ib), w.emscripten_main_runtime_thread_id = O(w.emscripten_main_runtime_thread_id), w.tb = I(w.tb), w.ub = O(w.ub), w;
                }(), Lo.push(Z.jb), Lt.unshift(Z.Ca), Y = b, Do(), Z;
            }
            var c = No();
            if (Gt++, u.instantiateWasm) try {
                return u.instantiateWasm(c, s);
            } catch (f) {
                j("Module.instantiateWasm callback failed with error: ".concat(f)), m(f);
            }
            return gn || (gn = u.locateFile ? Bo("ort-wasm-simd-threaded.jsep.wasm") ? "ort-wasm-simd-threaded.jsep.wasm" : u.locateFile ? u.locateFile("ort-wasm-simd-threaded.jsep.wasm", P) : P + "ort-wasm-simd-threaded.jsep.wasm" : new URL("ort-wasm-simd-threaded.jsep.wasm", import.meta.url).href), (function(f, b) {
                var w = gn;
                return D || typeof WebAssembly.instantiateStreaming != "function" || Bo(w) || Mo(w) || typeof fetch != "function" ? Uo(w, f, b) : fetch(w, {
                    credentials: "same-origin"
                }).then((I)=>WebAssembly.instantiateStreaming(I, f).then(b, function(O) {
                        return j("wasm streaming compile failed: ".concat(O)), j("falling back to ArrayBuffer instantiation"), Uo(w, f, b);
                    }));
            })(c, function(f) {
                s(f.instance, f.module);
            }).catch(m), {};
        }(), Vi = (s)=>(Vi = Z.Da)(s), Wi = ()=>(Wi = Z.Ea)();
        u._OrtInit = (s, c)=>(u._OrtInit = Z.Fa)(s, c), u._OrtGetLastError = (s, c)=>(u._OrtGetLastError = Z.Ga)(s, c), u._OrtCreateSessionOptions = (s, c, f, b, w, I, O, B, L, H)=>(u._OrtCreateSessionOptions = Z.Ha)(s, c, f, b, w, I, O, B, L, H), u._OrtAppendExecutionProvider = (s, c)=>(u._OrtAppendExecutionProvider = Z.Ia)(s, c), u._OrtAddFreeDimensionOverride = (s, c, f)=>(u._OrtAddFreeDimensionOverride = Z.Ja)(s, c, f), u._OrtAddSessionConfigEntry = (s, c, f)=>(u._OrtAddSessionConfigEntry = Z.Ka)(s, c, f), u._OrtReleaseSessionOptions = (s)=>(u._OrtReleaseSessionOptions = Z.La)(s), u._OrtCreateSession = (s, c, f)=>(u._OrtCreateSession = Z.Ma)(s, c, f), u._OrtReleaseSession = (s)=>(u._OrtReleaseSession = Z.Na)(s), u._OrtGetInputOutputCount = (s, c, f)=>(u._OrtGetInputOutputCount = Z.Oa)(s, c, f), u._OrtGetInputName = (s, c)=>(u._OrtGetInputName = Z.Pa)(s, c), u._OrtGetOutputName = (s, c)=>(u._OrtGetOutputName = Z.Qa)(s, c), u._OrtFree = (s)=>(u._OrtFree = Z.Ra)(s), u._OrtCreateTensor = (s, c, f, b, w, I)=>(u._OrtCreateTensor = Z.Sa)(s, c, f, b, w, I), u._OrtGetTensorData = (s, c, f, b, w)=>(u._OrtGetTensorData = Z.Ta)(s, c, f, b, w), u._OrtReleaseTensor = (s)=>(u._OrtReleaseTensor = Z.Ua)(s), u._OrtCreateRunOptions = (s, c, f, b)=>(u._OrtCreateRunOptions = Z.Va)(s, c, f, b), u._OrtAddRunConfigEntry = (s, c, f)=>(u._OrtAddRunConfigEntry = Z.Wa)(s, c, f), u._OrtReleaseRunOptions = (s)=>(u._OrtReleaseRunOptions = Z.Xa)(s), u._OrtCreateBinding = (s)=>(u._OrtCreateBinding = Z.Ya)(s), u._OrtBindInput = (s, c, f)=>(u._OrtBindInput = Z.Za)(s, c, f), u._OrtBindOutput = (s, c, f, b)=>(u._OrtBindOutput = Z._a)(s, c, f, b), u._OrtClearBoundOutputs = (s)=>(u._OrtClearBoundOutputs = Z.$a)(s), u._OrtReleaseBinding = (s)=>(u._OrtReleaseBinding = Z.ab)(s), u._OrtRunWithBinding = (s, c, f, b, w)=>(u._OrtRunWithBinding = Z.bb)(s, c, f, b, w), u._OrtRun = (s, c, f, b, w, I, O, B)=>(u._OrtRun = Z.cb)(s, c, f, b, w, I, O, B), u._OrtEndProfiling = (s)=>(u._OrtEndProfiling = Z.db)(s), u._JsepOutput = (s, c, f)=>(u._JsepOutput = Z.eb)(s, c, f), u._JsepGetNodeName = (s)=>(u._JsepGetNodeName = Z.fb)(s);
        var mr, Mt = ()=>(Mt = Z.gb)(), Je = u._free = (s)=>(Je = u._free = Z.hb)(s), fr = u._malloc = (s)=>(fr = u._malloc = Z.ib)(s), Dn = (s, c, f, b, w, I)=>(Dn = Z.lb)(s, c, f, b, w, I), Li = ()=>(Li = Z.mb)(), Gi = (s, c, f, b, w)=>(Gi = Z.nb)(s, c, f, b, w), Bn = (s)=>(Bn = Z.ob)(s), hr = (s)=>(hr = Z.pb)(s), Hi = ()=>(Hi = Z.qb)(), Fi = (s, c)=>(Fi = Z.rb)(s, c), gr = (s)=>(gr = Z.sb)(s), Mn = (s)=>(Mn = Z.tb)(s), Rn = ()=>(Rn = Z.ub)(), qi = u.dynCall_ii = (s, c)=>(qi = u.dynCall_ii = Z.wb)(s, c), Ki = (s)=>(Ki = Z.xb)(s), ji = ()=>(ji = Z.yb)(), Yi = (s)=>(Yi = Z.zb)(s), Zi = ()=>(Zi = Z.Ab)();
        function Qi() {
            0 < Gt || (g ? (p(u), g || or(Lt), startWorker(u)) : (or(Ye), 0 < Gt || mr || (mr = !0, u.calledRun = !0, we || (g || or(Lt), p(u), g || or(fn)))));
        }
        return u.___start_em_js = 929301, u.___stop_em_js = 929547, u.stackSave = ()=>Rn(), u.stackRestore = (s)=>gr(s), u.stackAlloc = (s)=>Mn(s), u.setValue = function(s, c) {
            let f = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "i8";
            switch(f.endsWith("*") && (f = "*"), f){
                case "i1":
                case "i8":
                    t()[s >>> 0] = c;
                    break;
                case "i16":
                    n()[s >>> 1 >>> 0] = c;
                    break;
                case "i32":
                    i()[s >>> 2 >>> 0] = c;
                    break;
                case "i64":
                    q[s >>> 3] = BigInt(c);
                    break;
                case "float":
                    d()[s >>> 2 >>> 0] = c;
                    break;
                case "double":
                    l()[s >>> 3 >>> 0] = c;
                    break;
                case "*":
                    a()[s >>> 2 >>> 0] = c;
                    break;
                default:
                    ct("invalid type for setValue: ".concat(f));
            }
        }, u.getValue = function(s) {
            let c = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "i8";
            switch(c.endsWith("*") && (c = "*"), c){
                case "i1":
                case "i8":
                    return t()[s >>> 0];
                case "i16":
                    return n()[s >>> 1 >>> 0];
                case "i32":
                    return i()[s >>> 2 >>> 0];
                case "i64":
                    return q[s >>> 3];
                case "float":
                    return d()[s >>> 2 >>> 0];
                case "double":
                    return l()[s >>> 3 >>> 0];
                case "*":
                    return a()[s >>> 2 >>> 0];
                default:
                    ct("invalid type for getValue: ".concat(c));
            }
        }, u.UTF8ToString = Ce, u.stringToUTF8 = Ot, u.lengthBytesUTF8 = $n, Ht = function s() {
            mr || Qi(), mr || (Ht = s);
        }, Qi(), u.PTR_SIZE = 4, h;
    }), Kp = za;
    ((_globalThis_self = globalThis.self) === null || _globalThis_self === void 0 ? void 0 : _globalThis_self.name) === "em-pthread" && za();
});
var Ra, jp, Ne, Ua, jn, Yp, Zp, Na, Qp, Ba, Va, Ma, Wa, xr = U(()=>{
    "use strict";
    $r();
    Ra = !1 || typeof location > "u" ? void 0 : location.origin, jp = ()=>{
        var _url;
        if (!!1) return ((_url = import.meta.url) === null || _url === void 0 ? void 0 : _url.startsWith("file:")) ? new URL(new URL("ort.webgpu.bundle.min.mjs", import.meta.url).href, Ra).href : import.meta.url;
    }, Ne = jp(), Ua = ()=>{
        if (Ne && !Ne.startsWith("blob:")) return Ne.substring(0, Ne.lastIndexOf("/") + 1);
    }, jn = (e1, t)=>{
        try {
            let r = t !== null && t !== void 0 ? t : Ne;
            return (r ? new URL(e1, r) : new URL(e1)).origin === Ra;
        } catch (e1) {
            return !1;
        }
    }, Yp = (e1, t)=>{
        let r = t !== null && t !== void 0 ? t : Ne;
        try {
            return (r ? new URL(e1, r) : new URL(e1)).href;
        } catch (e1) {
            return;
        }
    }, Zp = (e1, t)=>"".concat(t !== null && t !== void 0 ? t : "./").concat(e1), Na = async (e1)=>{
        let r = await (await fetch(e1, {
            credentials: "same-origin"
        })).blob();
        return URL.createObjectURL(r);
    }, Qp = async (e1)=>(await import(/*webpackIgnore:true*/ e1)).default, Ba = (Pa(), br(Ea)).default, Va = async ()=>{
        if (!Ne) throw new Error("Failed to load proxy worker: cannot determine the script source URL.");
        if (jn(Ne)) return [
            void 0,
            Ba()
        ];
        let e1 = await Na(Ne);
        return [
            e1,
            Ba(e1)
        ];
    }, Ma = (Da(), br(Oa)).default, Wa = async (e1, t, r)=>{
        if (!e1 && !t && Ma && Ne && jn(Ne)) return [
            void 0,
            Ma
        ];
        {
            let n = "ort-wasm-simd-threaded.jsep.mjs", o = e1 !== null && e1 !== void 0 ? e1 : Yp(n, t), i = !!1 && r && o && !jn(o, t), a = i ? await Na(o) : o !== null && o !== void 0 ? o : Zp(n, t);
            return [
                i ? a : void 0,
                await Qp(a)
            ];
        }
    };
});
var Yn, Zn, zr, La, Xp, Jp, Sr, Ie, gt = U(()=>{
    "use strict";
    xr();
    Zn = !1, zr = !1, La = !1, Xp = ()=>{
        if (typeof SharedArrayBuffer > "u") return !1;
        try {
            return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(new Uint8Array([
                0,
                97,
                115,
                109,
                1,
                0,
                0,
                0,
                1,
                4,
                1,
                96,
                0,
                0,
                3,
                2,
                1,
                0,
                5,
                4,
                1,
                3,
                1,
                1,
                10,
                11,
                1,
                9,
                0,
                65,
                0,
                254,
                16,
                2,
                0,
                26,
                11
            ]));
        } catch (e1) {
            return !1;
        }
    }, Jp = ()=>{
        try {
            return WebAssembly.validate(new Uint8Array([
                0,
                97,
                115,
                109,
                1,
                0,
                0,
                0,
                1,
                4,
                1,
                96,
                0,
                0,
                3,
                2,
                1,
                0,
                10,
                30,
                1,
                28,
                0,
                65,
                0,
                253,
                15,
                253,
                12,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                253,
                186,
                1,
                26,
                11
            ]));
        } catch (e1) {
            return !1;
        }
    }, Sr = async (e1)=>{
        if (Zn) return Promise.resolve();
        if (zr) throw new Error("multiple calls to 'initializeWebAssembly()' detected.");
        if (La) throw new Error("previous call to 'initializeWebAssembly()' failed.");
        zr = !0;
        let t = e1.initTimeout, r = e1.numThreads;
        if (!Jp()) throw new Error("WebAssembly SIMD is not supported in the current environment.");
        let n = Xp();
        r > 1 && !n && (typeof self < "u" && !self.crossOriginIsolated && console.warn("env.wasm.numThreads is set to " + r + ", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."), console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."), e1.numThreads = r = 1);
        var _a_href, _l_href;
        let o = e1.wasmPaths, i = typeof o == "string" ? o : void 0, a = o === null || o === void 0 ? void 0 : o.mjs, d = (_a_href = a === null || a === void 0 ? void 0 : a.href) !== null && _a_href !== void 0 ? _a_href : a, l = o === null || o === void 0 ? void 0 : o.wasm, p = (_l_href = l === null || l === void 0 ? void 0 : l.href) !== null && _l_href !== void 0 ? _l_href : l, m = e1.wasmBinary, [u, h] = await Wa(d, i, r > 1), _ = !1, y = [];
        if (t > 0 && y.push(new Promise((g)=>{
            setTimeout(()=>{
                _ = !0, g();
            }, t);
        })), y.push(new Promise((g, x)=>{
            let $ = {
                numThreads: r
            };
            if (m) $.wasmBinary = m;
            else if (p || i) $.locateFile = (v)=>p !== null && p !== void 0 ? p : i + v;
            else if (d && d.indexOf("blob:") !== 0) $.locateFile = (v)=>new URL(v, d).href;
            else if (u) {
                let v = Ua();
                v && ($.locateFile = (S)=>v + S);
            }
            h($).then((v)=>{
                zr = !1, Zn = !0, Yn = v, g(), u && URL.revokeObjectURL(u);
            }, (v)=>{
                zr = !1, La = !0, x(v);
            });
        })), await Promise.race(y), _) throw new Error("WebAssembly backend initializing failed due to timeout: ".concat(t, "ms"));
    }, Ie = ()=>{
        if (Zn && Yn) return Yn;
        throw new Error("WebAssembly is not initialized yet.");
    };
});
var ke, jt, pe, Or = U(()=>{
    "use strict";
    gt();
    ke = (e1, t)=>{
        let r = Ie(), n = r.lengthBytesUTF8(e1) + 1, o = r._malloc(n);
        return r.stringToUTF8(e1, o, n), t.push(o), o;
    }, jt = (e1, t, r, n)=>{
        if (typeof e1 == "object" && e1 !== null) {
            if (r.has(e1)) throw new Error("Circular reference in options");
            r.add(e1);
        }
        Object.entries(e1).forEach((param)=>{
            let [o, i] = param;
            let a = t ? t + o : o;
            if (typeof i == "object") jt(i, a + ".", r, n);
            else if (typeof i == "string" || typeof i == "number") n(a, i.toString());
            else if (typeof i == "boolean") n(a, i ? "1" : "0");
            else throw new Error("Can't handle extra config type: ".concat(typeof i));
        });
    }, pe = (e1)=>{
        let t = Ie(), r = t.stackSave();
        try {
            let n = t.PTR_SIZE, o = t.stackAlloc(2 * n);
            t._OrtGetLastError(o, o + n);
            let i = Number(t.getValue(o, n === 4 ? "i32" : "i64")), a = t.getValue(o + n, "*"), d = a ? t.UTF8ToString(a) : "";
            throw new Error("".concat(e1, " ERROR_CODE: ").concat(i, ", ERROR_MESSAGE: ").concat(d));
        } finally{
            t.stackRestore(r);
        }
    };
});
var Ga, Ha = U(()=>{
    "use strict";
    gt();
    Or();
    Ga = (e1)=>{
        let t = Ie(), r = 0, n = [], o = e1 || {};
        try {
            if ((e1 === null || e1 === void 0 ? void 0 : e1.logSeverityLevel) === void 0) o.logSeverityLevel = 2;
            else if (typeof e1.logSeverityLevel != "number" || !Number.isInteger(e1.logSeverityLevel) || e1.logSeverityLevel < 0 || e1.logSeverityLevel > 4) throw new Error("log serverity level is not valid: ".concat(e1.logSeverityLevel));
            if ((e1 === null || e1 === void 0 ? void 0 : e1.logVerbosityLevel) === void 0) o.logVerbosityLevel = 0;
            else if (typeof e1.logVerbosityLevel != "number" || !Number.isInteger(e1.logVerbosityLevel)) throw new Error("log verbosity level is not valid: ".concat(e1.logVerbosityLevel));
            (e1 === null || e1 === void 0 ? void 0 : e1.terminate) === void 0 && (o.terminate = !1);
            let i = 0;
            return (e1 === null || e1 === void 0 ? void 0 : e1.tag) !== void 0 && (i = ke(e1.tag, n)), r = t._OrtCreateRunOptions(o.logSeverityLevel, o.logVerbosityLevel, !!o.terminate, i), r === 0 && pe("Can't create run options."), (e1 === null || e1 === void 0 ? void 0 : e1.extra) !== void 0 && jt(e1.extra, "", new WeakSet, (a, d)=>{
                let l = ke(a, n), p = ke(d, n);
                t._OrtAddRunConfigEntry(r, l, p) !== 0 && pe("Can't set a run config entry: ".concat(a, " - ").concat(d, "."));
            }), [
                r,
                n
            ];
        } catch (i) {
            throw r !== 0 && t._OrtReleaseRunOptions(r), n.forEach((a)=>t._free(a)), i;
        }
    };
});
var em, tm, rm, nm, Fa, qa = U(()=>{
    "use strict";
    gt();
    Or();
    em = (e1)=>{
        switch(e1){
            case "disabled":
                return 0;
            case "basic":
                return 1;
            case "extended":
                return 2;
            case "all":
                return 99;
            default:
                throw new Error("unsupported graph optimization level: ".concat(e1));
        }
    }, tm = (e1)=>{
        switch(e1){
            case "sequential":
                return 0;
            case "parallel":
                return 1;
            default:
                throw new Error("unsupported execution mode: ".concat(e1));
        }
    }, rm = (e1)=>{
        e1.extra || (e1.extra = {}), e1.extra.session || (e1.extra.session = {});
        let t = e1.extra.session;
        t.use_ort_model_bytes_directly || (t.use_ort_model_bytes_directly = "1"), e1.executionProviders && e1.executionProviders.some((r)=>(typeof r == "string" ? r : r.name) === "webgpu") && (e1.enableMemPattern = !1);
    }, nm = (e1, t, r)=>{
        for (let n of t){
            let o = typeof n == "string" ? n : n.name;
            switch(o){
                case "webnn":
                    if (o = "WEBNN", typeof n != "string") {
                        let d = n === null || n === void 0 ? void 0 : n.deviceType;
                        if (d) {
                            let l = ke("deviceType", r), p = ke(d, r);
                            Ie()._OrtAddSessionConfigEntry(e1, l, p) !== 0 && pe("Can't set a session config entry: 'deviceType' - ".concat(d, "."));
                        }
                    }
                    break;
                case "webgpu":
                    if (o = "JS", typeof n != "string") {
                        let a = n;
                        if (a === null || a === void 0 ? void 0 : a.preferredLayout) {
                            if (a.preferredLayout !== "NCHW" && a.preferredLayout !== "NHWC") throw new Error("preferredLayout must be either 'NCHW' or 'NHWC': ".concat(a.preferredLayout));
                            let d = ke("preferredLayout", r), l = ke(a.preferredLayout, r);
                            Ie()._OrtAddSessionConfigEntry(e1, d, l) !== 0 && pe("Can't set a session config entry: 'preferredLayout' - ".concat(a.preferredLayout, "."));
                        }
                    }
                    break;
                case "wasm":
                case "cpu":
                    continue;
                default:
                    throw new Error("not supported execution provider: ".concat(o));
            }
            let i = ke(o, r);
            Ie()._OrtAppendExecutionProvider(e1, i) !== 0 && pe("Can't append execution provider: ".concat(o, "."));
        }
    }, Fa = (e1)=>{
        let t = Ie(), r = 0, n = [], o = e1 || {};
        rm(o);
        try {
            var _o_graphOptimizationLevel, _o_executionMode, _o_logSeverityLevel;
            let i = em((_o_graphOptimizationLevel = o.graphOptimizationLevel) !== null && _o_graphOptimizationLevel !== void 0 ? _o_graphOptimizationLevel : "all"), a = tm((_o_executionMode = o.executionMode) !== null && _o_executionMode !== void 0 ? _o_executionMode : "sequential"), d = typeof o.logId == "string" ? ke(o.logId, n) : 0, l = (_o_logSeverityLevel = o.logSeverityLevel) !== null && _o_logSeverityLevel !== void 0 ? _o_logSeverityLevel : 2;
            if (!Number.isInteger(l) || l < 0 || l > 4) throw new Error("log serverity level is not valid: ".concat(l));
            var _o_logVerbosityLevel;
            let p = (_o_logVerbosityLevel = o.logVerbosityLevel) !== null && _o_logVerbosityLevel !== void 0 ? _o_logVerbosityLevel : 0;
            if (!Number.isInteger(p) || p < 0 || p > 4) throw new Error("log verbosity level is not valid: ".concat(p));
            let m = typeof o.optimizedModelFilePath == "string" ? ke(o.optimizedModelFilePath, n) : 0;
            if (r = t._OrtCreateSessionOptions(i, !!o.enableCpuMemArena, !!o.enableMemPattern, a, !!o.enableProfiling, 0, d, l, p, m), r === 0 && pe("Can't create session options."), o.executionProviders && nm(r, o.executionProviders, n), o.enableGraphCapture !== void 0) {
                if (typeof o.enableGraphCapture != "boolean") throw new Error("enableGraphCapture must be a boolean value: ".concat(o.enableGraphCapture));
                let u = ke("enableGraphCapture", n), h = ke(o.enableGraphCapture.toString(), n);
                t._OrtAddSessionConfigEntry(r, u, h) !== 0 && pe("Can't set a session config entry: 'enableGraphCapture' - ".concat(o.enableGraphCapture, "."));
            }
            if (o.freeDimensionOverrides) for (let [u, h] of Object.entries(o.freeDimensionOverrides)){
                if (typeof u != "string") throw new Error("free dimension override name must be a string: ".concat(u));
                if (typeof h != "number" || !Number.isInteger(h) || h < 0) throw new Error("free dimension override value must be a non-negative integer: ".concat(h));
                let _ = ke(u, n);
                t._OrtAddFreeDimensionOverride(r, _, h) !== 0 && pe("Can't set a free dimension override: ".concat(u, " - ").concat(h, "."));
            }
            return o.extra !== void 0 && jt(o.extra, "", new WeakSet, (u, h)=>{
                let _ = ke(u, n), y = ke(h, n);
                t._OrtAddSessionConfigEntry(r, _, y) !== 0 && pe("Can't set a session config entry: ".concat(u, " - ").concat(h, "."));
            }), [
                r,
                n
            ];
        } catch (i) {
            throw r !== 0 && t._OrtReleaseSessionOptions(r) !== 0 && pe("Can't release session options."), n.forEach((a)=>t._free(a)), i;
        }
    };
});
var Yt, bt, Ct, Dr, Zt, Br, Mr, Qn, te = U(()=>{
    "use strict";
    Yt = (e1)=>{
        switch(e1){
            case "int8":
                return 3;
            case "uint8":
                return 2;
            case "bool":
                return 9;
            case "int16":
                return 5;
            case "uint16":
                return 4;
            case "int32":
                return 6;
            case "uint32":
                return 12;
            case "float16":
                return 10;
            case "float32":
                return 1;
            case "float64":
                return 11;
            case "string":
                return 8;
            case "int64":
                return 7;
            case "uint64":
                return 13;
            case "int4":
                return 22;
            case "uint4":
                return 21;
            default:
                throw new Error("unsupported data type: ".concat(e1));
        }
    }, bt = (e1)=>{
        switch(e1){
            case 3:
                return "int8";
            case 2:
                return "uint8";
            case 9:
                return "bool";
            case 5:
                return "int16";
            case 4:
                return "uint16";
            case 6:
                return "int32";
            case 12:
                return "uint32";
            case 10:
                return "float16";
            case 1:
                return "float32";
            case 11:
                return "float64";
            case 8:
                return "string";
            case 7:
                return "int64";
            case 13:
                return "uint64";
            case 22:
                return "int4";
            case 21:
                return "uint4";
            default:
                throw new Error("unsupported data type: ".concat(e1));
        }
    }, Ct = (e1, t)=>{
        let r = [
            -1,
            4,
            1,
            1,
            2,
            2,
            4,
            8,
            -1,
            1,
            2,
            8,
            4,
            8,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            .5,
            .5
        ][e1], n = typeof t == "number" ? t : t.reduce((o, i)=>o * i, 1);
        return r > 0 ? Math.ceil(n * r) : void 0;
    }, Dr = (e1)=>{
        switch(e1){
            case "float16":
                return typeof Float16Array < "u" && Float16Array.from ? Float16Array : Uint16Array;
            case "float32":
                return Float32Array;
            case "uint8":
                return Uint8Array;
            case "int8":
                return Int8Array;
            case "uint16":
                return Uint16Array;
            case "int16":
                return Int16Array;
            case "int32":
                return Int32Array;
            case "bool":
                return Uint8Array;
            case "float64":
                return Float64Array;
            case "uint32":
                return Uint32Array;
            case "int64":
                return BigInt64Array;
            case "uint64":
                return BigUint64Array;
            default:
                throw new Error("unsupported type: ".concat(e1));
        }
    }, Zt = (e1)=>{
        switch(e1){
            case "verbose":
                return 0;
            case "info":
                return 1;
            case "warning":
                return 2;
            case "error":
                return 3;
            case "fatal":
                return 4;
            default:
                throw new Error("unsupported logging level: ".concat(e1));
        }
    }, Br = (e1)=>e1 === "float32" || e1 === "float16" || e1 === "int32" || e1 === "int64" || e1 === "uint32" || e1 === "uint8" || e1 === "bool" || e1 === "uint4" || e1 === "int4", Mr = (e1)=>e1 === "float32" || e1 === "float16" || e1 === "int32" || e1 === "int64" || e1 === "uint32" || e1 === "uint64" || e1 === "int8" || e1 === "uint8" || e1 === "bool" || e1 === "uint4" || e1 === "int4", Qn = (e1)=>{
        switch(e1){
            case "none":
                return 0;
            case "cpu":
                return 1;
            case "cpu-pinned":
                return 2;
            case "texture":
                return 3;
            case "gpu-buffer":
                return 4;
            case "ml-tensor":
                return 5;
            default:
                throw new Error("unsupported data location: ".concat(e1));
        }
    };
});
var Qt, Xn = U(()=>{
    "use strict";
    $r();
    Qt = async (e1)=>{
        if (typeof e1 == "string") if (!1) try {
            let { readFile: t } = Nn("node:fs/promises");
            return new Uint8Array(await t(e1));
        } catch (t) {
            if (t.code === "ERR_FS_FILE_TOO_LARGE") {
                let { createReadStream: r } = Nn("node:fs"), n = r(e1), o = [];
                for await (let i of n)o.push(i);
                return new Uint8Array(Buffer.concat(o));
            }
            throw t;
        }
        else {
            let t = await fetch(e1);
            if (!t.ok) throw new Error("failed to load external data file: ".concat(e1));
            let r = t.headers.get("Content-Length"), n = r ? parseInt(r, 10) : 0;
            if (n < 1073741824) return new Uint8Array(await t.arrayBuffer());
            {
                if (!t.body) throw new Error("failed to load external data file: ".concat(e1, ", no response body."));
                let o = t.body.getReader(), i;
                try {
                    i = new ArrayBuffer(n);
                } catch (d) {
                    if (d instanceof RangeError) {
                        let l = Math.ceil(n / 65536);
                        i = new WebAssembly.Memory({
                            initial: l,
                            maximum: l
                        }).buffer;
                    } else throw d;
                }
                let a = 0;
                for(;;){
                    let { done: d, value: l } = await o.read();
                    if (d) break;
                    let p = l.byteLength;
                    new Uint8Array(i, a, p).set(l), a += p;
                }
                return new Uint8Array(i, 0, n);
            }
        }
        else return e1 instanceof Blob ? new Uint8Array(await e1.arrayBuffer()) : e1 instanceof Uint8Array ? e1 : new Uint8Array(e1);
    };
});
var om, im, Ka, ja, Rr, am, ue, et = U(()=>{
    "use strict";
    te();
    om = [
        "V",
        "I",
        "W",
        "E",
        "F"
    ], im = (e1, t)=>{
        console.log("[".concat(om[e1], ",").concat(new Date().toISOString(), "]").concat(t));
    }, Rr = (e1, t)=>{
        Ka = e1, ja = t;
    }, am = (e1, t)=>{
        let r = Zt(e1), n = Zt(Ka);
        r >= n && im(r, typeof t == "function" ? t() : t);
    }, ue = function() {
        for(var _len = arguments.length, e1 = new Array(_len), _key = 0; _key < _len; _key++){
            e1[_key] = arguments[_key];
        }
        ja && am(...e1);
    };
});
var Ur, Jn = U(()=>{
    "use strict";
    te();
    Ur = (e1, t)=>new (Dr(t))(e1);
});
var Nr = U(_c9 = ()=>{
    "use strict";
});
_c10 = Nr;
var Ya, eo, to, sm, um, Za, no, ro, Xa, Ja = U(()=>{
    "use strict";
    et();
    Nr();
    Ya = new Map([
        [
            64,
            250
        ],
        [
            128,
            200
        ],
        [
            256,
            200
        ],
        [
            512,
            200
        ],
        [
            2048,
            230
        ],
        [
            4096,
            200
        ],
        [
            8192,
            50
        ],
        [
            16384,
            50
        ],
        [
            32768,
            50
        ],
        [
            65536,
            50
        ],
        [
            131072,
            50
        ],
        [
            262144,
            50
        ],
        [
            524288,
            50
        ],
        [
            1048576,
            50
        ],
        [
            2097152,
            30
        ],
        [
            4194304,
            20
        ],
        [
            8388608,
            10
        ],
        [
            12582912,
            10
        ],
        [
            16777216,
            10
        ],
        [
            26214400,
            15
        ],
        [
            33554432,
            22
        ],
        [
            44236800,
            2
        ],
        [
            58982400,
            6
        ],
        [
            67108864,
            6
        ],
        [
            134217728,
            6
        ],
        [
            167772160,
            6
        ]
    ]), eo = [], to = (e1)=>Math.ceil(Number(e1) / 16) * 16, sm = (e1)=>{
        for(let t = 0; t < eo.length; t++){
            let r = eo[t];
            if (e1 <= r) return r;
        }
        return Math.ceil(e1 / 16) * 16;
    }, um = 1, Za = ()=>um++, no = async (e1, t, r, n)=>{
        let o = to(r), i = e1.device.createBuffer({
            size: o,
            usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
        });
        try {
            let a = e1.getCommandEncoder();
            e1.endComputePass(), a.copyBufferToBuffer(t, 0, i, 0, o), e1.flush(), await i.mapAsync(GPUMapMode.READ);
            let d = i.getMappedRange();
            if (n) {
                let l = n();
                return l.set(new Uint8Array(d, 0, r)), l;
            } else return new Uint8Array(d.slice(0, r));
        } finally{
            i.destroy();
        }
    }, ro = class {
        upload(t, r) {
            let n = r.buffer, o = r.byteOffset, i = r.byteLength, a = to(i), d = this.storageCache.get(t);
            if (!d) throw new Error("gpu data for uploading does not exist");
            if (Number(d.originalSize) !== i) throw new Error("inconsistent data size. gpu data size=".concat(d.originalSize, ", data size=").concat(i));
            let l = this.backend.device.createBuffer({
                mappedAtCreation: !0,
                size: a,
                usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
            }), p = l.getMappedRange();
            new Uint8Array(p).set(new Uint8Array(n, o, i)), l.unmap();
            let m = this.backend.device.createCommandEncoder();
            m.copyBufferToBuffer(l, 0, d.gpuData.buffer, 0, a), this.backend.device.queue.submit([
                m.finish()
            ]), l.destroy(), ue("verbose", ()=>"[WebGPU] GpuDataManager.upload(id=".concat(t, ")"));
        }
        memcpy(t, r) {
            let n = this.storageCache.get(t);
            if (!n) throw new Error("source gpu data for memcpy does not exist");
            let o = this.storageCache.get(r);
            if (!o) throw new Error("destination gpu data for memcpy does not exist");
            if (n.originalSize !== o.originalSize) throw new Error("inconsistent source and destination gpu data size");
            let i = to(n.originalSize), a = this.backend.getCommandEncoder();
            this.backend.endComputePass(), a.copyBufferToBuffer(n.gpuData.buffer, 0, o.gpuData.buffer, 0, i);
        }
        registerExternalBuffer(t, r, n) {
            let o;
            if (n) {
                if (o = n[0], t === n[1]) return ue("verbose", ()=>"[WebGPU] GpuDataManager.registerExternalBuffer(size=".concat(r, ") => id=").concat(o, ", buffer is the same, skip.")), o;
                if (this.backend.capturedCommandList.has(this.backend.currentSessionId)) throw new Error("Registering a different external buffer under graph capture mode is not supported yet.\n             Please use the previous external buffer!");
            } else o = Za();
            return this.storageCache.set(o, {
                gpuData: {
                    id: o,
                    type: 0,
                    buffer: t
                },
                originalSize: r
            }), ue("verbose", ()=>"[WebGPU] GpuDataManager.registerExternalBuffer(size=".concat(r, ") => id=").concat(o, ", registered.")), o;
        }
        unregisterExternalBuffer(t) {
            t !== void 0 && (this.storageCache.delete(t), ue("verbose", ()=>"[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=".concat(t)));
        }
        create(t) {
            let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST;
            let n = sm(t), o, i = (r & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE, a = (r & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM;
            if (i || a) {
                let p = (i ? this.freeBuffers : this.freeUniformBuffers).get(n);
                p ? p.length > 0 ? o = p.pop() : o = this.backend.device.createBuffer({
                    size: n,
                    usage: r
                }) : o = this.backend.device.createBuffer({
                    size: n,
                    usage: r
                });
            } else o = this.backend.device.createBuffer({
                size: n,
                usage: r
            });
            let d = {
                id: Za(),
                type: 0,
                buffer: o
            };
            return this.storageCache.set(d.id, {
                gpuData: d,
                originalSize: Number(t)
            }), ue("verbose", ()=>"[WebGPU] GpuDataManager.create(size=".concat(t, ") => id=").concat(d.id)), d;
        }
        get(t) {
            var _this_storageCache_get;
            return (_this_storageCache_get = this.storageCache.get(t)) === null || _this_storageCache_get === void 0 ? void 0 : _this_storageCache_get.gpuData;
        }
        release(t) {
            let r = typeof t == "bigint" ? Number(t) : t, n = this.storageCache.get(r);
            if (!n) {
                if (this.storageCache.size === 0) return 0;
                throw new Error("releasing data does not exist");
            }
            return ue("verbose", ()=>"[WebGPU] GpuDataManager.release(id=".concat(r, "), gpuDataId=").concat(n.gpuData.id)), this.storageCache.delete(r), this.buffersPending.push(n.gpuData.buffer), n.originalSize;
        }
        async download(t, r) {
            let n = this.storageCache.get(Number(t));
            if (!n) throw new Error("data does not exist");
            await no(this.backend, n.gpuData.buffer, n.originalSize, r);
        }
        refreshPendingBuffers() {
            if (this.buffersPending.length !== 0) if (this.backend.sessionStatus === "default") {
                for (let t of this.buffersPending){
                    let r = Ya.get(t.size);
                    if ((t.usage & GPUBufferUsage.STORAGE) === GPUBufferUsage.STORAGE) {
                        let n = this.freeBuffers.get(t.size) || [];
                        r === void 0 || n.length >= r ? t.destroy() : n.push(t);
                    } else if ((t.usage & GPUBufferUsage.UNIFORM) === GPUBufferUsage.UNIFORM) {
                        let n = this.freeUniformBuffers.get(t.size) || [];
                        r === void 0 || n.length >= r ? t.destroy() : n.push(t);
                    } else t.destroy();
                }
                this.buffersPending = [];
            } else {
                let t = this.capturedPendingBuffers.get(this.backend.currentSessionId);
                t || (t = [], this.capturedPendingBuffers.set(this.backend.currentSessionId, t));
                for (let r of this.buffersPending)t.push(r);
                this.buffersPending = [];
            }
        }
        dispose() {
            this.freeBuffers.forEach((t)=>{
                t.forEach((r)=>{
                    r.destroy();
                });
            }), this.freeUniformBuffers.forEach((t)=>{
                t.forEach((r)=>{
                    r.destroy();
                });
            }), this.storageCache.forEach((t)=>{
                t.gpuData.buffer.destroy();
            }), this.capturedPendingBuffers.forEach((t)=>{
                t.forEach((r)=>{
                    r.destroy();
                });
            }), this.storageCache = new Map, this.freeBuffers = new Map, this.freeUniformBuffers = new Map, this.capturedPendingBuffers = new Map;
        }
        onCreateSession() {
            this.sessionCount += 1;
        }
        onReleaseSession(t) {
            let r = this.capturedPendingBuffers.get(t);
            r && (r.forEach((n)=>{
                n.destroy();
            }), this.capturedPendingBuffers.delete(t)), this.sessionCount -= 1, this.sessionCount === 0 && (ue("warning", ()=>"[WebGPU] Clearing webgpu buffer cache"), this.storageCache.forEach((n)=>{
                n.gpuData.buffer.destroy();
            }), this.storageCache = new Map);
        }
        constructor(t){
            this.backend = t;
            this.storageCache = new Map, this.freeBuffers = new Map, this.freeUniformBuffers = new Map, this.buffersPending = [], this.capturedPendingBuffers = new Map;
            for (let [r] of Ya)eo.push(r), this.freeBuffers.set(r, []), this.freeUniformBuffers.set(r, []);
            this.sessionCount = 0;
        }
    }, Xa = function() {
        for(var _len = arguments.length, e1 = new Array(_len), _key = 0; _key < _len; _key++){
            e1[_key] = arguments[_key];
        }
        return new ro(...e1);
    };
});
var oo, re, Se = U(()=>{
    "use strict";
    oo = class {
        get cacheKey() {
            return this.key || (this.key = Object.getOwnPropertyNames(this).sort().map((t)=>"".concat(this[t])).join(";")), this.key;
        }
        constructor(t){
            Object.assign(this, t);
        }
    }, re = (e1)=>new oo(e1);
});
var io, tt, C, At, Vr, es, ts, oe = U(()=>{
    "use strict";
    io = class {
        static calcMatMulShape(t, r) {
            return t[1] !== r[0] ? void 0 : [
                t[0],
                r[1]
            ];
        }
    }, tt = class {
        static calcShape(t, r) {
            let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            let o = t.length, i = r.length;
            if (o === 0) return r;
            if (i === 0) return t;
            let a = Math.max(t.length, r.length), d = new Array(a);
            if (n) {
                if (o < 2 || i < 2) return;
                let l = io.calcMatMulShape([
                    t[o - 2],
                    t[o - 1]
                ], [
                    r[i - 2],
                    r[i - 1]
                ]);
                if (l === void 0) return;
                [d[a - 2], d[a - 1]] = l;
            }
            for(let l = n ? 3 : 1; l <= a; l++){
                let p = o - l < 0 ? 1 : t[o - l], m = i - l < 0 ? 1 : r[i - l];
                if (p !== m && p > 1 && m > 1) return;
                let u = Math.max(p, m);
                if (p && m) d[a - l] = Math.max(p, m);
                else {
                    if (u > 1) return;
                    d[a - l] = 0;
                }
            }
            return d;
        }
        static isValidBroadcast(t, r) {
            let n = t.length, o = r.length;
            if (n > o) return !1;
            for(let i = 1; i <= n; i++)if (t[n - i] !== 1 && t[n - i] !== r[o - i]) return !1;
            return !0;
        }
    }, C = class e1 {
        static size(t) {
            return e1.getSizeFromDimensionRange(t, 0, t.length);
        }
        static convertShape(t) {
            let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
            let n = t.length;
            if (n === 0) return [];
            let o = new Array(n), i = n - 1;
            for(; i >= 0;){
                if (t[i] % r === 0) {
                    o[i] = t[i] / r;
                    break;
                }
                if (r % t[i] !== 0) throw new Error("cannot convert shape");
                o[i] = 1, r /= t[i], i--;
            }
            for(i--; i >= 0; i--)o[i] = t[i];
            return o;
        }
        static sizeFromDimension(t, r) {
            if (r < 0 || r > t.length) throw new Error("invalid dimension of ".concat(r, " for sizeFromDimension as Tensor has ").concat(t.length, " dimensions."));
            return e1.getSizeFromDimensionRange(t, r, t.length);
        }
        static sizeToDimension(t, r) {
            if (r < 0 || r > t.length) throw new Error("invalid dimension of ".concat(r, " for sizeToDimension as Tensor has ").concat(t.length, " dimensions."));
            return e1.getSizeFromDimensionRange(t, 0, r);
        }
        static getSizeFromDimensionRange(t, r, n) {
            let o = 1;
            for(let i = r; i < n; i++){
                if (t[i] < 0) throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");
                o *= Number(t[i]);
            }
            return o;
        }
        static computeStrides(t) {
            let r = t.length;
            if (r === 0) return [];
            if (r === 1) return [
                1
            ];
            let n = new Array(r);
            n[r - 1] = 1, n[r - 2] = t[r - 1];
            for(let o = r - 3; o >= 0; --o)n[o] = n[o + 1] * t[o + 1];
            return n;
        }
        static normalizeAxis(t, r) {
            if (t < -r && t >= r) throw new Error("unsupported axis for this operation.");
            return t < 0 ? t + r : t;
        }
        static normalizeAxes(t, r) {
            return t.map((n)=>this.normalizeAxis(n, r !== null && r !== void 0 ? r : t.length));
        }
        static sortBasedOnPerm(t, r) {
            return r ? r.map((n)=>t[n]) : t.slice().reverse();
        }
        static padShape(t, r) {
            let n = t.length;
            return t.map((o, i)=>o + r[i] + r[i + n]);
        }
        static areEqual(t, r) {
            return t.length !== r.length ? !1 : t.every((n, o)=>n === r[o]);
        }
    }, At = class e1 {
        static adjustPoolAttributes(t, r, n, o, i, a) {
            if (!t && n.length !== r.length - 2) throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");
            if (t) for(let d = 0; d < r.length - 2; d++)d >= n.length ? n.push(r[d + 2]) : n[d] = r[d + 2];
            for(let d = 0; d < n.length; d++)if (d < o.length) {
                if (o[d] < 0) throw new Error("strides should be greater than or equal to 1");
            } else o.push(1);
            for(let d = 0; d < n.length; d++)if (d < i.length) {
                if (i[d] < 0) throw new Error("dilations should be greater than or equal to 1");
            } else i.push(1);
            for(let d = 0; d < n.length * 2; d++)if (d < a.length) {
                if (a[d] < 0) throw new Error("pad should be greater than or equal to 1");
            } else a.push(0);
            for(let d = 0; d < n.length; d++){
                if (n[d] <= 0) throw new Error("kernel shapes need to be greater than 0");
                if (a[d] >= n[d] || a[d + n.length] >= n[d]) throw new Error("pads should be smaller than kernel");
            }
        }
        static adjustPadsBasedOnAutoPad(t, r, n, o, i, a, d) {
            if (d) {
                if (i.length !== 2 * (t.length - 2)) throw new Error("length of pads should be twice the length of data dimensions");
                if (r.length !== t.length - 2) throw new Error("length of strides should be the length of data dimensions");
                if (o.length !== t.length - 2) throw new Error("length of kernel shapes should be the length of data dimensions");
                for(let l = 0; l < t.length - 2; l++)e1.adjustPadAndReturnShape(t[l + (a ? 1 : 2)], r[l], n[l], o[l], i, l, l + t.length - 2, d);
            }
        }
        static computePoolOutputShape(t, r, n, o, i, a, d) {
            if (r.length <= 0) throw new Error("input shape must be of size greater than 0");
            let l = [
                r[0],
                r[1]
            ];
            return e1.computeShapeHelper(t, r, l, n, o, i, a, d), l;
        }
        static computeConvOutputShape(t, r, n, o, i, a, d) {
            if (t.length <= 0 || r.length <= 0) throw new Error("invalid input tensor dims or invalid filter tensor dims");
            let l = [
                t[0],
                r[0]
            ];
            return e1.computeShapeHelper(!1, t, l, n, o, i, a, d), l;
        }
        static computeShapeHelper(t, r, n, o, i, a, d, l) {
            if (t) for(let p = 0; p < r.length - 2; p++)n.push(1);
            else for(let p = 0; p < r.length - 2; p++)n.push(e1.adjustPadAndReturnShape(r[p + 2], o[p], i[p], a[p], d, p, p + r.length - 2, l));
        }
        static adjustPadAndReturnShape(t, r, n, o, i, a, d, l) {
            let p = n * (o - 1) + 1;
            if (l && l !== "NOTSET") switch(l){
                case "VALID":
                    return i[a] = 0, i[d] = 0, Math.floor((t - p) / r + 1);
                case "SAME_LOWER":
                case "SAME_UPPER":
                    if (n !== 1) throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");
                    {
                        let u = ((t + r - 1) / r - 1) * r + o - t;
                        return i[a] = Math.floor(l === "SAME_LOWER" ? (u + 1) / 2 : u / 2), i[d] = u - i[a], Math.floor((t + u - o) / r + 1);
                    }
                default:
                    throw new Error("Unsupported AutoPad type");
            }
            else return Math.floor((t + i[a] + i[d] - p) / r + 1);
        }
    }, Vr = class {
        static getShapeOfGemmResult(t, r, n, o, i) {
            if (t.length !== 2 || n.length !== 2) throw new Error("shape need to be of size 2");
            let a, d, l;
            r ? (a = t[1], d = t[0]) : (a = t[0], d = t[1]);
            let p = -1;
            if (o ? (l = n[0], p = 1) : (l = n[1], p = 0), n[p] !== d) throw new Error("dimension mismatch");
            if (a <= 0 || l <= 0 || d <= 0) throw new Error("invalid shape specified");
            if (i && !tt.isValidBroadcast(i, [
                a,
                l
            ])) throw new Error("gemm: invalid bias shape for broadcast");
            return [
                a,
                l,
                d
            ];
        }
    }, es = -34028234663852886e22, ts = 34028234663852886e22;
});
var kt, so, _e, Ee, N, me, uo, Et, Fe, F, Wr, E, M, rs, Lr, ao, ns, ae = U(()=>{
    "use strict";
    te();
    oe();
    kt = 64, so = (e1, t)=>{
        if (t === 3) throw new Error("vec3 has same alignment as vec4, use vec4 instead");
        switch(Number(e1)){
            case 10:
                return t > 1 ? "vec".concat(t, "<f16>") : "f16";
            case 1:
                return t > 1 ? "vec".concat(t, "<f32>") : "f32";
            case 6:
                return t > 1 ? "vec".concat(t, "<i32>") : "i32";
            case 12:
                return t > 1 ? "vec".concat(t, "<u32>") : "u32";
            case 7:
                if (t > 1) throw new Error("currently not supported vecX of uint64 yet");
                return [
                    "vec2<u32>",
                    "i32"
                ];
            case 13:
                if (t > 1) throw new Error("currently not supported vecX of uint64 yet");
                return [
                    "vec2<u32>",
                    "u32"
                ];
            case 9:
                if (t !== 4) throw new Error("bool must be vec4");
                return [
                    "u32",
                    "vec4<bool>"
                ];
            case 22:
                return "i32";
            case 21:
                return "u32";
            default:
                throw new Error("Unknown data type: ".concat(e1));
        }
    }, _e = function(e1) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        let r = so(e1, t);
        return typeof r == "string" ? r : r[0];
    }, Ee = function(e1) {
        let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
        let r = so(e1, t);
        return typeof r == "string" ? r : r[1];
    }, N = function() {
        for(var _len = arguments.length, e1 = new Array(_len), _key = 0; _key < _len; _key++){
            e1[_key] = arguments[_key];
        }
        let t = [];
        return e1.forEach((r)=>{
            r.length !== 0 && t.push({
                type: 12,
                data: r
            }, {
                type: 12,
                data: C.computeStrides(r)
            });
        }), t;
    }, me = (e1)=>e1 % 4 === 0 ? 4 : e1 % 2 === 0 ? 2 : 1, uo = function() {
        let e1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "f32", t = arguments.length > 1 ? arguments[1] : void 0, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "0";
        return !t || t === 1 ? "".concat(e1, "(").concat(r, ")") : "vec".concat(t, "<").concat(e1, ">(").concat(r, ")");
    }, Et = (e1, t, r)=>e1 === "f32" ? r : t === 1 ? "f32(".concat(r, ")") : "vec".concat(t, "<f32>(").concat(r, ")"), Fe = (e1, t)=>t === 4 ? "(".concat(e1, ".x + ").concat(e1, ".y + ").concat(e1, ".z + ").concat(e1, ".w)") : t === 2 ? "(".concat(e1, ".x + ").concat(e1, ".y)") : t === 3 ? "(".concat(e1, ".x + ").concat(e1, ".y + ").concat(e1, ".z)") : e1, F = (e1, t, r, n)=>e1.startsWith("uniforms.") && r > 4 ? typeof t == "string" ? n === "f16" ? "".concat(e1, "[(").concat(t, ") / 8][(").concat(t, ") % 8 / 4][(").concat(t, ") % 8 % 4]") : "".concat(e1, "[(").concat(t, ") / 4][(").concat(t, ") % 4]") : n === "f16" ? "".concat(e1, "[").concat(Math.floor(t / 8), "][").concat(Math.floor(t % 8 / 4), "][").concat(t % 8 % 4, "]") : "".concat(e1, "[").concat(Math.floor(t / 4), "][").concat(t % 4, "]") : r > 1 ? "".concat(e1, "[").concat(t, "]") : e1, Wr = (e1, t, r, n, o)=>{
        let i = typeof r == "number", a = i ? r : r.length, d = [
            ...new Array(a).keys()
        ], l = a < 2 ? "u32" : a <= 4 ? "vec".concat(a, "<u32>") : "array<u32, ".concat(a, ">"), p = so(t, o), m = typeof p == "string" ? p : p[1], u = typeof p == "string" ? p : p[0], h = {
            indices: l,
            value: m,
            storage: u,
            tensor: t
        }, _ = (W)=>typeof W == "string" ? W : "".concat(W, "u"), y = {
            offsetToIndices: !1,
            indicesToOffset: !1,
            broadcastedIndicesToOffset: !1,
            set: !1,
            setByIndices: !1,
            get: !1,
            getByIndices: !1
        }, g = i ? "uniforms." : "", x = "".concat(g).concat(e1, "_shape"), $ = "".concat(g).concat(e1, "_strides"), v = "";
        for(let W = 0; W < a - 1; W++)v += "\n    let dim".concat(W, " = current / ").concat(F($, W, a), ";\n    let rest").concat(W, " = current % ").concat(F($, W, a), ";\n    indices[").concat(W, "] = dim").concat(W, ";\n    current = rest").concat(W, ";\n    ");
        v += "indices[".concat(a - 1, "] = current;");
        let S = a < 2 ? "" : "\n  fn o2i_".concat(e1, "(offset: u32) -> ").concat(h.indices, " {\n    var indices: ").concat(h.indices, ";\n    var current = offset;\n    ").concat(v, "\n    return indices;\n  }"), T = (W)=>(y.offsetToIndices = !0, a < 2 ? W : "o2i_".concat(e1, "(").concat(W, ")")), A = [];
        if (a >= 2) for(let W = a - 1; W >= 0; W--)A.push("".concat(F($, W, a), " * (indices[").concat(W, "])"));
        let k = a < 2 ? "" : "\n  fn i2o_".concat(e1, "(indices: ").concat(h.indices, ") -> u32 {\n    return ").concat(A.join("+"), ";\n  }"), P = (W)=>(y.indicesToOffset = !0, a < 2 ? W : "i2o_".concat(e1, "(").concat(W, ")")), D = function() {
            for(var _len = arguments.length, W = new Array(_len), _key = 0; _key < _len; _key++){
                W[_key] = arguments[_key];
            }
            return a === 0 ? "0u" : "".concat(h.indices, "(").concat(W.map(_).join(","), ")");
        }, R = (W, q)=>a < 2 ? "".concat(W) : "".concat(F(W, q, a)), G = (W, q, he)=>a < 2 ? "".concat(W, "=").concat(he, ";") : "".concat(F(W, q, a), "=").concat(he, ";"), K = {}, j = (W, q)=>{
            y.broadcastedIndicesToOffset = !0;
            let he = "".concat(q.name, "broadcastedIndicesTo").concat(e1, "Offset");
            if (he in K) return "".concat(he, "(").concat(W, ")");
            let Ge = [];
            for(let we = a - 1; we >= 0; we--){
                let ye = q.indicesGet("outputIndices", we + q.rank - a);
                Ge.push("".concat(R($, we), " * (").concat(ye, " % ").concat(R(x, we), ")"));
            }
            return K[he] = "fn ".concat(he, "(outputIndices: ").concat(q.type.indices, ") -> u32 {\n             return ").concat(Ge.length > 0 ? Ge.join("+") : "0u", ";\n           }"), "".concat(he, "(").concat(W, ")");
        }, V = (W, q)=>(()=>{
                if (h.storage === h.value) return "".concat(e1, "[").concat(W, "]=").concat(q, ";");
                if (h.storage === "vec2<u32>" && h.value === "i32") return "".concat(e1, "[").concat(W, "]=vec2<u32>(u32(").concat(q, "), select(0u, 0xFFFFFFFFu, ").concat(q, " < 0));");
                if (h.storage === "vec2<u32>" && h.value === "u32") return "".concat(e1, "[").concat(W, "]=vec2<u32>(u32(").concat(q, "), 0u);");
                if (h.storage === "u32" && h.value === "vec4<bool>") return "".concat(e1, "[").concat(W, "]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(").concat(q, "));");
                throw new Error("not supported combination of storage type ".concat(h.storage, " and value type ").concat(h.value, " yet"));
            })(), Q = (W)=>(()=>{
                if (h.storage === h.value) return "".concat(e1, "[").concat(W, "]");
                if (h.storage === "vec2<u32>" && h.value === "i32") return "i32(".concat(e1, "[").concat(W, "].x)");
                if (h.storage === "vec2<u32>" && h.value === "u32") return "u32(".concat(e1, "[").concat(W, "].x)");
                if (h.storage === "u32" && h.value === "vec4<bool>") return "vec4<bool>(bool(".concat(e1, "[").concat(W, "] & 0xFFu), bool(").concat(e1, "[").concat(W, "] & 0xFF00u), bool(").concat(e1, "[").concat(W, "] & 0xFF0000u), bool(").concat(e1, "[").concat(W, "] & 0xFF000000u))");
                throw new Error("not supported combination of storage type ".concat(h.storage, " and value type ").concat(h.value, " yet"));
            })(), se = a < 2 ? "" : "\n  fn get_".concat(e1, "ByIndices(indices: ").concat(h.indices, ") -> ").concat(m, " {\n    return ").concat(Q("i2o_".concat(e1, "(indices)")), ";\n  }"), Y = a < 2 ? "" : (()=>{
            let W = d.map((he)=>"d".concat(he, ": u32")).join(", "), q = d.map((he)=>"d".concat(he)).join(", ");
            return "\n  fn get_".concat(e1, "(").concat(W, ") -> ").concat(m, " {\n    return get_").concat(e1, "ByIndices(").concat(D(q), ");\n  }");
        })(), ee = function() {
            for(var _len = arguments.length, W = new Array(_len), _key = 0; _key < _len; _key++){
                W[_key] = arguments[_key];
            }
            if (W.length !== a) throw new Error("indices length must be ".concat(a));
            let q = W.map(_).join(",");
            return a === 0 ? Q("0u") : a === 1 ? Q(q[0]) : (y.get = !0, y.getByIndices = !0, y.indicesToOffset = !0, "get_".concat(e1, "(").concat(q, ")"));
        }, J = (W)=>a < 2 ? Q(W) : (y.getByIndices = !0, y.indicesToOffset = !0, "get_".concat(e1, "ByIndices(").concat(W, ")")), ne = a < 2 ? "" : "\n  fn set_".concat(e1, "ByIndices(indices: ").concat(h.indices, ", value: ").concat(m, ") {\n    ").concat(V("i2o_".concat(e1, "(indices)"), "value"), "\n  }"), be = a < 2 ? "" : (()=>{
            let W = d.map((he)=>"d".concat(he, ": u32")).join(", "), q = d.map((he)=>"d".concat(he)).join(", ");
            return "\n  fn set_".concat(e1, "(").concat(W, ", value: ").concat(m, ") {\n    set_").concat(e1, "ByIndices(").concat(D(q), ", value);\n  }");
        })();
        return {
            impl: ()=>{
                let W = [], q = !1;
                return y.offsetToIndices && (W.push(S), q = !0), y.indicesToOffset && (W.push(k), q = !0), y.broadcastedIndicesToOffset && (Object.values(K).forEach((he)=>W.push(he)), q = !0), y.set && (W.push(be), q = !0), y.setByIndices && (W.push(ne), q = !0), y.get && (W.push(Y), q = !0), y.getByIndices && (W.push(se), q = !0), !i && q && W.unshift("const ".concat(x, " = ").concat(h.indices, "(").concat(r.join(","), ");"), "const ".concat($, " = ").concat(h.indices, "(").concat(C.computeStrides(r).join(","), ");")), W.join("\n");
            },
            type: h,
            offsetToIndices: T,
            indicesToOffset: P,
            broadcastedIndicesToOffset: j,
            indices: D,
            indicesGet: R,
            indicesSet: G,
            set: function() {
                for(var _len = arguments.length, W = new Array(_len), _key = 0; _key < _len; _key++){
                    W[_key] = arguments[_key];
                }
                if (W.length !== a + 1) throw new Error("indices length must be ".concat(a));
                let q = W[a];
                if (typeof q != "string") throw new Error("value must be string");
                let he = W.slice(0, a).map(_).join(",");
                return a === 0 ? V("0u", q) : a === 1 ? V(he[0], q) : (y.set = !0, y.setByIndices = !0, y.indicesToOffset = !0, "set_".concat(e1, "(").concat(he, ", ").concat(q, ")"));
            },
            setByOffset: V,
            setByIndices: (W, q)=>a < 2 ? V(W, q) : (y.setByIndices = !0, y.indicesToOffset = !0, "set_".concat(e1, "ByIndices(").concat(W, ", ").concat(q, ");")),
            get: ee,
            getByOffset: Q,
            getByIndices: J,
            usage: n,
            name: e1,
            strides: $,
            shape: x,
            rank: a
        };
    }, E = function(e1, t, r) {
        let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
        return Wr(e1, t, r, "input", n);
    }, M = function(e1, t, r) {
        let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
        return Wr(e1, t, r, "output", n);
    }, rs = (e1, t, r)=>Wr(e1, t, r, "atomicOutput", 1), Lr = function(e1, t, r) {
        let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
        return Wr(e1, t, r, "internal", n);
    }, ao = class {
        guardAgainstOutOfBoundsWorkgroupSizes(t) {
            return "if (global_idx >= ".concat(typeof t == "number" ? "".concat(t, "u") : t, ") { return; }");
        }
        mainStart() {
            let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : kt;
            let r = typeof t == "number" ? t : t[0], n = typeof t == "number" ? 1 : t[1], o = typeof t == "number" ? 1 : t[2];
            if (r > this.limits.maxComputeWorkgroupSizeX || n > this.limits.maxComputeWorkgroupSizeY || o > this.limits.maxComputeWorkgroupSizeZ) throw new Error("workgroup size [".concat(r, ", ").concat(n, ", ").concat(o, "] exceeds the maximum workgroup size [").concat(this.limits.maxComputeWorkgroupSizeX, ", ").concat(this.limits.maxComputeWorkgroupSizeY, ", ").concat(this.limits.maxComputeWorkgroupSizeZ, "]."));
            if (r * n * o > this.limits.maxComputeInvocationsPerWorkgroup) throw new Error("workgroup size [".concat(r, ", ").concat(n, ", ").concat(o, "] exceeds the maximum workgroup invocations ").concat(this.limits.maxComputeInvocationsPerWorkgroup, "."));
            let i = this.normalizedDispatchGroup[1] === 1 && this.normalizedDispatchGroup[2] === 1, a = i ? "@builtin(global_invocation_id) global_id : vec3<u32>,\n    @builtin(workgroup_id) workgroup_id : vec3<u32>,\n    @builtin(local_invocation_index) local_idx : u32,\n    @builtin(local_invocation_id) local_id : vec3<u32>" : "@builtin(global_invocation_id) global_id : vec3<u32>,\n                                             @builtin(local_invocation_id) local_id : vec3<u32>,\n    @builtin(local_invocation_index) local_idx : u32,\n    @builtin(workgroup_id) workgroup_id : vec3<u32>,\n    @builtin(num_workgroups) num_workgroups : vec3<u32>", d = i ? "let global_idx = global_id.x;\n         let workgroup_index = workgroup_id.x;" : "let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +\n             workgroup_id.y * num_workgroups[0] + workgroup_id.x;\n         let global_idx = workgroup_index * ".concat(r * n * o, "u + local_idx;");
            return "@compute @workgroup_size(".concat(r, ", ").concat(n, ", ").concat(o, ")\n  fn main(").concat(a, ") {\n    ").concat(d, "\n  ");
        }
        appendVariableUniforms(t) {
            t.rank !== 0 && (t.shape.startsWith("uniforms.") && this.uniforms.push({
                name: t.shape.replace("uniforms.", ""),
                type: "u32",
                length: t.rank
            }), t.strides.startsWith("uniforms.") && this.uniforms.push({
                name: t.strides.replace("uniforms.", ""),
                type: "u32",
                length: t.rank
            }));
        }
        declareVariable(t, r) {
            if (t.usage === "internal") throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");
            this.variables.push(t), this.appendVariableUniforms(t);
            let n = t.usage === "input" ? "read" : "read_write", o = t.usage === "atomicOutput" ? "atomic<i32>" : t.type.storage;
            return "@group(0) @binding(".concat(r, ") var<storage, ").concat(n, "> ").concat(t.name, ": array<").concat(o, ">;");
        }
        declareVariables() {
            for(var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++){
                t[_key] = arguments[_key];
            }
            return t.map((r)=>this.declareVariable(r, this.variableIndex++)).join("\n");
        }
        registerInternalVariable(t) {
            if (t.usage !== "internal") throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");
            this.internalVariables.push(t), this.appendVariableUniforms(t);
        }
        registerInternalVariables() {
            for(var _len = arguments.length, t = new Array(_len), _key = 0; _key < _len; _key++){
                t[_key] = arguments[_key];
            }
            return t.forEach((r)=>this.registerInternalVariable(r)), this;
        }
        registerUniform(t, r) {
            let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
            return this.uniforms.push({
                name: t,
                type: r,
                length: n
            }), this;
        }
        registerUniforms(t) {
            return this.uniforms = this.uniforms.concat(t), this;
        }
        uniformDeclaration() {
            if (this.uniforms.length === 0) return "";
            let t = [];
            for (let { name: r, type: n, length: o } of this.uniforms)if (o && o > 4) n === "f16" ? t.push("@align(16) ".concat(r, ":array<mat2x4<").concat(n, ">, ").concat(Math.ceil(o / 8), ">")) : t.push("".concat(r, ":array<vec4<").concat(n, ">, ").concat(Math.ceil(o / 4), ">"));
            else {
                let i = o == null || o === 1 ? n : "vec".concat(o, "<").concat(n, ">");
                t.push("".concat(r, ":").concat(i));
            }
            return "\n      struct Uniforms { ".concat(t.join(", "), " };\n      @group(0) @binding(").concat(this.variableIndex, ") var<uniform> uniforms: Uniforms;");
        }
        get additionalImplementations() {
            return this.uniformDeclaration() + this.variables.map((t)=>t.impl()).join("\n") + this.internalVariables.map((t)=>t.impl()).join("\n");
        }
        get variablesInfo() {
            if (this.uniforms.length === 0) return;
            let t = (r)=>[
                    12,
                    10,
                    1,
                    6
                ][[
                    "u32",
                    "f16",
                    "f32",
                    "i32"
                ].indexOf(r)];
            return this.uniforms.map((r)=>{
                var _r_length;
                return [
                    t(r.type),
                    (_r_length = r.length) !== null && _r_length !== void 0 ? _r_length : 1
                ];
            });
        }
        constructor(t, r){
            this.normalizedDispatchGroup = t;
            this.limits = r;
            this.internalVariables = [];
            this.variables = [];
            this.uniforms = [];
            this.variableIndex = 0;
        }
    }, ns = (e1, t)=>new ao(e1, t);
});
var dm, os, lm, cm, pm, mm, Pe, is, as, dt = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    dm = (e1, t)=>{
        if (!e1 || e1.length !== 1) throw new Error("Transpose requires 1 input.");
        if (t.length !== 0 && t.length !== e1[0].dims.length) throw new Error("perm size ".concat(t.length, " does not match input rank ").concat(e1[0].dims.length));
    }, os = (e1, t)=>t.length !== 0 ? t : [
            ...new Array(e1).keys()
        ].reverse(), lm = (e1, t)=>C.sortBasedOnPerm(e1, os(e1.length, t)), cm = (e1, t, r, n)=>{
        let o = "fn perm(i: ".concat(n.type.indices, ") -> ").concat(r.type.indices, " {\n    var a: ").concat(r.type.indices, ";");
        for(let i = 0; i < t; ++i)o += "a[".concat(e1[i], "]=i[").concat(i, "];");
        return o += "return a;}";
    }, pm = (e1, t)=>{
        let r = [], n = [];
        for(let o = 0; o < e1.length; ++o)e1[o] !== 1 && r.push(e1[o]), e1[t[o]] !== 1 && n.push(t[o]);
        return {
            newShape: r,
            newPerm: n
        };
    }, mm = (e1, t)=>{
        let r = 0;
        for(let n = 0; n < e1.length; ++n)if (t[e1[n]] !== 1) {
            if (e1[n] < r) return !1;
            r = e1[n];
        }
        return !0;
    }, Pe = (e1, t)=>{
        let r = e1.dataType, n = e1.dims.length, o = os(n, t), i = lm(e1.dims, o), a = e1.dims, d = i, l = n < 2 || mm(o, e1.dims), p;
        if (l) return p = (g)=>{
            let x = E("input", r, a, 4), $ = M("output", r, d, 4);
            return "\n  ".concat(g.registerUniform("output_size", "u32").declareVariables(x, $), "\n  ").concat(g.mainStart(), "\n    ").concat(g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n    output[global_idx] = input[global_idx];\n  }");
        }, {
            name: "TransposeCopy",
            shaderCache: {
                inputDependencies: [
                    "type"
                ]
            },
            getRunData: ()=>{
                let g = C.size(i);
                return {
                    outputs: [
                        {
                            dims: i,
                            dataType: e1.dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(g / 64 / 4)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: Math.ceil(g / 4)
                        }
                    ]
                };
            },
            getShaderSource: p
        };
        let { newShape: m, newPerm: u } = pm(e1.dims, o), h = C.areEqual(u, [
            2,
            3,
            1
        ]), _ = C.areEqual(u, [
            3,
            1,
            2
        ]);
        if (m.length === 2 || h || _) {
            a = h ? [
                m[0],
                m[1] * m[2]
            ] : _ ? [
                m[0] * m[1],
                m[2]
            ] : m, d = [
                a[1],
                a[0]
            ];
            let g = 16;
            return p = (x)=>{
                let $ = E("a", r, a.length), v = M("output", r, d.length);
                return "\n  ".concat(x.registerUniform("output_size", "u32").declareVariables($, v), "\n  var<workgroup> tile : array<array<").concat(v.type.value, ", ").concat(g + 1, ">, ").concat(g, ">;\n  ").concat(x.mainStart([
                    g,
                    g,
                    1
                ]), "\n    let stride = (uniforms.output_shape[1] - 1) / ").concat(g, " + 1;\n    let workgroup_id_x = workgroup_index % stride;\n    let workgroup_id_y = workgroup_index / stride;\n    let input_col = workgroup_id_y * ").concat(g, "u + local_id.x;\n    let input_row = workgroup_id_x * ").concat(g, "u + local_id.y;\n    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {\n      tile[local_id.y][local_id.x] = ").concat($.getByIndices("".concat($.type.indices, "(input_row, input_col)")), ";\n    }\n    workgroupBarrier();\n\n    let output_col = workgroup_id_x * ").concat(g, "u + local_id.x;\n    let output_row = workgroup_id_y * ").concat(g, "u + local_id.y;\n    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {\n      ").concat(v.setByIndices("".concat(v.type.indices, "(output_row, output_col)"), "tile[local_id.x][local_id.y]"), "\n    }\n  }");
            }, {
                name: "TransposeShared",
                shaderCache: {
                    inputDependencies: [
                        "type"
                    ]
                },
                getRunData: ()=>{
                    let x = C.size(i);
                    return {
                        outputs: [
                            {
                                dims: i,
                                dataType: e1.dataType
                            }
                        ],
                        dispatchGroup: {
                            x: Math.ceil(d[1] / g),
                            y: Math.ceil(d[0] / g)
                        },
                        programUniforms: [
                            {
                                type: 12,
                                data: x
                            },
                            ...N(a, d)
                        ]
                    };
                },
                getShaderSource: p
            };
        }
        return p = (g)=>{
            let x = E("a", r, a.length), $ = M("output", r, d.length);
            return "\n  ".concat(g.registerUniform("output_size", "u32").declareVariables(x, $), "\n\n  ").concat(cm(o, n, x, $), "\n\n  ").concat(g.mainStart(), "\n    ").concat(g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n\n    let indices = ").concat($.offsetToIndices("global_idx"), ";\n    let aIndices = perm(indices);\n\n    ").concat($.setByOffset("global_idx", x.getByIndices("aIndices")), "\n  }");
        }, {
            name: "Transpose",
            shaderCache: {
                hint: "".concat(t),
                inputDependencies: [
                    "rank"
                ]
            },
            getRunData: ()=>{
                let g = C.size(i);
                return {
                    outputs: [
                        {
                            dims: i,
                            dataType: e1.dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(g / 64)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: g
                        },
                        ...N(a, d)
                    ]
                };
            },
            getShaderSource: p
        };
    }, is = (e1, t)=>{
        dm(e1.inputs, t.perm), e1.compute(Pe(e1.inputs[0], t.perm));
    }, as = (e1)=>re({
            perm: e1.perm
        });
});
var fm, hm, gm, bm, ym, _m, wm, vm, $m, xm, rt, ss, us, ds, ls, cs, ps, ms, fs, hs, gs, bs = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    Gr();
    dt();
    fm = {
        max: "select(bestValue, candidate, candidate > bestValue)",
        min: "select(bestValue, candidate, candidate < bestValue)",
        mean: "bestValue + candidate",
        sum: "bestValue + candidate",
        prod: "bestValue * candidate",
        sumSquare: "bestValue + candidate * candidate",
        logSumExp: "bestValue + exp(candidate)",
        l1: "bestValue + abs(candidate)",
        l2: "bestValue + candidate * candidate",
        logSum: "bestValue + candidate"
    }, hm = {
        max: "select(bestValue, candidate, candidate > bestValue)",
        min: "select(bestValue, candidate, candidate < bestValue)",
        mean: "bestValue + candidate",
        sum: "bestValue + candidate",
        prod: "bestValue * candidate",
        sumSquare: "bestValue + candidate",
        logSumExp: "bestValue + candidate",
        l1: "bestValue + candidate",
        l2: "bestValue + candidate",
        logSum: "bestValue + candidate"
    }, gm = {
        max: "_A[offset]",
        min: "_A[offset]",
        mean: "0",
        sum: "0",
        prod: "1",
        sumSquare: "0",
        logSumExp: "0",
        l1: "0",
        l2: "0",
        logSum: "0"
    }, bm = {
        max: "bestValue",
        min: "bestValue",
        sum: "bestValue",
        prod: "bestValue",
        sumSquare: "bestValue",
        logSumExp: "log(bestValue)",
        l1: "bestValue",
        l2: "sqrt(bestValue)",
        logSum: "log(bestValue)"
    }, ym = (e1, t)=>{
        let r = [];
        for(let n = t - e1; n < t; ++n)r.push(n);
        return r;
    }, _m = (e1, t)=>{
        let r = [], n = e1.length;
        for(let i = 0; i < n; i++)t.indexOf(i) === -1 && r.push(e1[i]);
        let o = t.map((i)=>e1[i]);
        return [
            r,
            o
        ];
    }, wm = (e1, t)=>{
        let r = e1.length + t.length, n = [], o = 0;
        for(let i = 0; i < r; i++)t.indexOf(i) === -1 ? n.push(e1[o++]) : n.push(1);
        return n;
    }, vm = (e1, t)=>{
        for(let r = 0; r < e1.length; ++r)if (e1[e1.length - r - 1] !== t - 1 - r) return !1;
        return !0;
    }, $m = (e1, t)=>{
        let r = [];
        if (!vm(e1, t)) {
            for(let n = 0; n < t; ++n)e1.indexOf(n) === -1 && r.push(n);
            e1.forEach((n)=>r.push(n));
        }
        return r;
    }, xm = (e1, t, r, n, o, i, a)=>{
        let d = r[0].dims, l = C.size(i), p = C.size(a), m = E("_A", r[0].dataType, d), u = M("output", o, i), h = 64;
        l === 1 && (h = 256);
        let _ = "\n          var<workgroup> aBestValues : array<f32, ".concat(h, ">;\n       "), y = (g)=>"\n        ".concat(g.registerUniform("reduceSize", "u32").declareVariables(m, u), "\n        ").concat(_, "\n        fn DIV_CEIL(a : u32, b : u32) -> u32 {\n          return ((a - 1u) / b + 1u);\n         }\n         ").concat(g.mainStart(h), "\n\n          let outputIndex = global_idx / ").concat(h, ";\n          let offset = outputIndex * uniforms.reduceSize;\n\n          var bestValue = f32(").concat(gm[n], ");\n          let Length = uniforms.reduceSize;\n          for (var k = local_idx; k < Length; k = k + ").concat(h, ") {\n           let candidate = f32(").concat(m.getByOffset("offset + k"), ");\n           bestValue = ").concat(fm[n], ";\n          }\n          aBestValues[local_idx] = bestValue;\n          workgroupBarrier();\n\n         var reduceSize = min(Length, ").concat(h, "u);\n         for (var currentSize = reduceSize / 2u; reduceSize > 1u;\n             currentSize = reduceSize / 2u) {\n           let interval = DIV_CEIL(reduceSize, 2u);\n           if (local_idx < currentSize) {\n            let candidate = aBestValues[local_idx + interval];\n            bestValue = ").concat(hm[n], ";\n            aBestValues[local_idx] = bestValue;\n           }\n           reduceSize = interval;\n           workgroupBarrier();\n         }\n\n         if (local_idx == 0u) {\n          ").concat(u.setByOffset("outputIndex", "".concat(n === "mean" ? "".concat(u.type.storage, "(bestValue / f32(uniforms.reduceSize))") : "".concat(u.type.storage, "(").concat(bm[n], ")"))), ";\n         }\n        }");
        return {
            name: e1,
            shaderCache: {
                hint: "".concat(t, ";").concat(h),
                inputDependencies: [
                    "type"
                ]
            },
            getShaderSource: y,
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: i,
                            dataType: o
                        }
                    ],
                    dispatchGroup: {
                        x: l
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: p
                        }
                    ]
                })
        };
    }, rt = (e1, t, r, n)=>{
        let o = e1.inputs.length === 1 ? r : lo(e1.inputs, r), i = o.axes;
        i.length === 0 && !o.noopWithEmptyAxes && (i = e1.inputs[0].dims.map((_, y)=>y));
        let a = C.normalizeAxes(i, e1.inputs[0].dims.length), d = a, l = e1.inputs[0], p = $m(d, e1.inputs[0].dims.length);
        p.length > 0 && (l = e1.compute(Pe(e1.inputs[0], p), {
            inputs: [
                0
            ],
            outputs: [
                -1
            ]
        })[0], d = ym(d.length, l.dims.length));
        let [m, u] = _m(l.dims, d), h = m;
        o.keepDims && (h = wm(m, a)), e1.compute(xm(t, o.cacheKey, [
            l
        ], n, e1.inputs[0].dataType, h, u), {
            inputs: [
                l
            ]
        });
    }, ss = (e1, t)=>{
        rt(e1, "ReduceMeanShared", t, "mean");
    }, us = (e1, t)=>{
        rt(e1, "ReduceL1Shared", t, "l1");
    }, ds = (e1, t)=>{
        rt(e1, "ReduceL2Shared", t, "l2");
    }, ls = (e1, t)=>{
        rt(e1, "ReduceLogSumExpShared", t, "logSumExp");
    }, cs = (e1, t)=>{
        rt(e1, "ReduceMaxShared", t, "max");
    }, ps = (e1, t)=>{
        rt(e1, "ReduceMinShared", t, "min");
    }, ms = (e1, t)=>{
        rt(e1, "ReduceProdShared", t, "prod");
    }, fs = (e1, t)=>{
        rt(e1, "ReduceSumShared", t, "sum");
    }, hs = (e1, t)=>{
        rt(e1, "ReduceSumSquareShared", t, "sumSquare");
    }, gs = (e1, t)=>{
        rt(e1, "ReduceLogSumShared", t, "logSum");
    };
});
var nt, Sm, Hr, lo, ot, Tm, Im, Cm, Am, km, Em, Pm, zm, Om, Dm, it, ys, _s, ws, vs, $s, xs, Ss, Ts, Is, Cs, Gr = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    bs();
    nt = (e1)=>{
        if (!e1 || e1.length === 0 || e1.length > 2) throw new Error("Reduce op requires 1 or 2 inputs.");
        if (e1.length === 2 && e1[1].dims.length !== 1) throw new Error("Invalid axes input dims.");
    }, Sm = (e1)=>[
            "",
            "",
            "var value = ".concat(e1.getByIndices("input_indices"), ";"),
            ""
        ], Hr = function(e1, t, r, n, o, i) {
        let a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : !1, d = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : !1;
        let l = [], p = r[0].dims, m = p.length, u = C.normalizeAxes(o, m), h = !d && u.length === 0;
        p.forEach((x, $)=>{
            h || u.indexOf($) >= 0 ? a && l.push(1) : l.push(x);
        });
        let _ = l.length, y = C.size(l);
        return {
            name: e1,
            shaderCache: t,
            getShaderSource: (x)=>{
                let $ = [], v = E("_A", r[0].dataType, m), S = M("output", i, _), T = n(v, S, u), A = T[2];
                for(let k = 0, P = 0; k < m; k++)h || u.indexOf(k) >= 0 ? (a && P++, A = "for(var j".concat(k, ": u32 = 0; j").concat(k, " < ").concat(p[k], "; j").concat(k, "++) {\n                  ").concat(T[2].includes("last_index") ? "let last_index = j".concat(k, ";") : "", "\n                  ").concat(v.indicesSet("input_indices", k, "j".concat(k)), "\n                  ").concat(A, "\n                }")) : ($.push("".concat(v.indicesSet("input_indices", k, S.indicesGet("output_indices", P)), ";")), P++);
                return "\n\n        ".concat(x.registerUniform("output_size", "u32").declareVariables(v, S), "\n\n        ").concat(x.mainStart(), "\n          ").concat(x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n          var input_indices: ").concat(v.type.indices, ";\n          let output_indices = ").concat(S.offsetToIndices("global_idx"), ";\n\n          ").concat($.join("\n"), "\n          ").concat(T[0], "       // init ops for reduce max/min\n          ").concat(T[1], "\n          ").concat(A, "\n          ").concat(T[3], "\n          ").concat(T.length === 4 ? S.setByOffset("global_idx", "value") : T.slice(4).join("\n"), "\n        }");
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: l,
                            dataType: i
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(y / 64)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: y
                        },
                        ...N(p, l)
                    ]
                })
        };
    }, lo = (e1, t)=>{
        let r = [];
        return e1[1].dims[0] > 0 && e1[1].getBigInt64Array().forEach((n)=>r.push(Number(n))), re({
            axes: r,
            keepDims: t.keepDims,
            noopWithEmptyAxes: t.noopWithEmptyAxes
        });
    }, ot = (e1, t, r, n)=>{
        let o = e1.inputs, i = o.length === 1 ? r : lo(o, r);
        e1.compute(Hr(t, {
            hint: i.cacheKey,
            inputDependencies: [
                "rank"
            ]
        }, [
            o[0]
        ], i.noopWithEmptyAxes && i.axes.length === 0 ? Sm : n, i.axes, o[0].dataType, i.keepDims, i.noopWithEmptyAxes), {
            inputs: [
                0
            ]
        });
    }, Tm = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceLogSum", t, (n, o)=>[
                "var value = ".concat(o.type.storage, "(0);"),
                "",
                "value += ".concat(n.getByIndices("input_indices"), ";"),
                "value = log(value);"
            ]);
    }, Im = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceL1", t, (n, o)=>[
                "var value = ".concat(o.type.storage, "(0);"),
                "",
                "value += abs(".concat(n.getByIndices("input_indices"), ");"),
                ""
            ]);
    }, Cm = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceL2", t, (n, o)=>[
                "var t = ".concat(o.type.value, "(0); var value = ").concat(o.type.value, "(0);"),
                "",
                "t = ".concat(n.getByIndices("input_indices"), "; value += (t * t);"),
                "value = sqrt(value);"
            ]);
    }, Am = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceLogSumExp", t, (n, o)=>[
                "var value = ".concat(o.type.storage, "(0);"),
                "",
                "value += exp(".concat(n.getByIndices("input_indices"), ");"),
                "value = log(value);"
            ]);
    }, km = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceMax", t, (n, o, i)=>{
            let a = [];
            for(let d = 0; d < n.rank; d++)(i.indexOf(d) >= 0 || i.length === 0) && a.push(n.indicesSet("input_indices", d, 0));
            return [
                "".concat(a.join("\n")),
                "var value = ".concat(n.getByIndices("input_indices"), ";"),
                "value = max(value, ".concat(n.getByIndices("input_indices"), ");"),
                ""
            ];
        });
    }, Em = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceMean", t, (n, o, i)=>{
            let a = 1;
            for(let d = 0; d < n.rank; d++)(i.indexOf(d) >= 0 || i.length === 0) && (a *= e1.inputs[0].dims[d]);
            return [
                "var sum = f32(0);",
                "",
                "sum += f32(".concat(n.getByIndices("input_indices"), ");"),
                "let value = ".concat(o.type.value, "(sum / ").concat(a, ");")
            ];
        });
    }, Pm = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceMin", t, (n, o, i)=>{
            let a = [];
            for(let d = 0; d < n.rank; d++)(i.indexOf(d) >= 0 || i.length === 0) && a.push("input_indices[".concat(d, "] = 0;"));
            return [
                "".concat(a.join("\n")),
                "var value = ".concat(n.getByIndices("input_indices"), ";"),
                "value = min(value, ".concat(n.getByIndices("input_indices"), ");"),
                ""
            ];
        });
    }, zm = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceProd", t, (n, o)=>[
                "var value = ".concat(o.type.storage, "(1);"),
                "",
                "value *= ".concat(n.getByIndices("input_indices"), ";"),
                ""
            ]);
    }, Om = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceSum", t, (n, o)=>[
                "var value = ".concat(o.type.storage, "(0);"),
                "",
                "value += ".concat(n.getByIndices("input_indices"), ";"),
                ""
            ]);
    }, Dm = (e1, t)=>{
        nt(e1.inputs), ot(e1, "ReduceSumSquare", t, (n, o)=>[
                "var t = ".concat(o.type.value, "(0); var value = ").concat(o.type.value, "(0);"),
                "",
                "t = ".concat(n.getByIndices("input_indices"), "; value += t * t;"),
                ""
            ]);
    }, it = (e1, t, r)=>{
        if (t.length === 0) return r;
        let n = 1, o = 1;
        for(let i = 0; i < t.length; i++)t.indexOf(i) === -1 ? n *= e1[i] : o *= e1[i];
        return o < 32 && n > 1024;
    }, ys = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Em(e1, t) : ss(e1, t);
    }, _s = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Im(e1, t) : us(e1, t);
    }, ws = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Cm(e1, t) : ds(e1, t);
    }, vs = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Am(e1, t) : ls(e1, t);
    }, $s = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? km(e1, t) : cs(e1, t);
    }, xs = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Pm(e1, t) : ps(e1, t);
    }, Ss = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? zm(e1, t) : ms(e1, t);
    }, Ts = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Om(e1, t) : fs(e1, t);
    }, Is = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Dm(e1, t) : hs(e1, t);
    }, Cs = (e1, t)=>{
        it(e1.inputs[0].dims, t.axes, t.noopWithEmptyAxes) ? Tm(e1, t) : gs(e1, t);
    };
});
var As, ks, Es, co, Ps = U(()=>{
    "use strict";
    te();
    Se();
    Gr();
    As = (e1)=>{
        if (!e1 || e1.length === 0 || e1.length > 2) throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");
        if (e1[0].dataType !== 1) throw new Error("Invalid input type.");
    }, ks = (e1, t)=>{
        As(e1.inputs);
        let r = (n, o, i)=>{
            let a = [];
            for(let d = 0; d < n.rank; d++)(i.indexOf(d) >= 0 || i.length === 0) && a.push("input_indices[".concat(d, "] = 0;"));
            return [
                "".concat(a.join("\n")),
                "var value = ".concat(n.getByIndices("input_indices"), ";\nvar best_index : i32 = 0;"),
                "if (".concat(n.getByIndices("input_indices"), " ").concat(t.selectLastIndex > 0 ? "<=" : "<", " value) {\n         value = ").concat(n.getByIndices("input_indices"), ";\n         best_index = i32(last_index);\n       }"),
                "",
                o.setByOffset("global_idx", "best_index")
            ];
        };
        e1.compute(Hr("ArgMin", {
            hint: t.cacheKey,
            inputDependencies: [
                "rank"
            ]
        }, [
            e1.inputs[0]
        ], r, [
            t.axis
        ], 7, t.keepDims), {
            inputs: [
                0
            ]
        });
    }, Es = (e1, t)=>{
        As(e1.inputs);
        let r = (n, o, i)=>{
            let a = [];
            for(let d = 0; d < n.rank; d++)(i.indexOf(d) >= 0 || i.length === 0) && a.push("input_indices[".concat(d, "] = 0;"));
            return [
                "".concat(a.join("\n")),
                "var value = ".concat(n.getByIndices("input_indices"), ";\nvar best_index : i32 = 0;"),
                "if (".concat(n.getByIndices("input_indices"), " ").concat(t.selectLastIndex > 0 ? ">=" : ">", " value) {\n         value = ").concat(n.getByIndices("input_indices"), ";\n         best_index = i32(last_index);\n       }"),
                "",
                o.setByOffset("global_idx", "best_index")
            ];
        };
        e1.compute(Hr("argMax", {
            hint: t.cacheKey,
            inputDependencies: [
                "rank"
            ]
        }, [
            e1.inputs[0]
        ], r, [
            t.axis
        ], 7, t.keepDims), {
            inputs: [
                0
            ]
        });
    }, co = (e1)=>re(e1);
});
var Bm, po, Mm, Rm, Um, Rt, Nm, zs, Fr = U(()=>{
    "use strict";
    te();
    oe();
    Nr();
    ae();
    Bm = (e1, t)=>{
        let r = e1[0], n = e1[1], o = e1[2], i = e1[3], a = e1[4], d = e1[5];
        if (a && d) throw new Error("Attention cannot have both past and attention_bias");
        if (r.dims.length !== 3) throw new Error('Input "input" must have 3 dimensions');
        let l = r.dims[0], p = r.dims[1], m = r.dims[2];
        if (o.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimensions');
        if (n.dims.length !== 2) throw new Error('Input "weights" is expected to have 2 dimensions');
        if (n.dims[0] !== m) throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");
        if (o.dims[0] !== n.dims[1]) throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');
        let u = o.dims[0] / 3, h = u, _ = h;
        if (t.qkvHiddenSizes.length > 0) {
            if (t.qkvHiddenSizes.length !== 3) throw new Error("qkv_hidden_sizes attribute should have 3 elements");
            for (let S of t.qkvHiddenSizes)if (S % t.numHeads !== 0) throw new Error("qkv_hidden_sizes should be divisible by num_heads");
            u = t.qkvHiddenSizes[0], h = t.qkvHiddenSizes[1], _ = t.qkvHiddenSizes[2];
        }
        let y = p;
        if (u !== h) throw new Error("qkv_hidden_sizes first element should be same as the second");
        if (o.dims[0] !== u + h + _) throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');
        let g = 0;
        if (a) {
            if (h !== _) throw new Error('Input "past" expect k_hidden_size == v_hidden_size');
            if (a.dims.length !== 5) throw new Error('Input "past" must have 5 dimensions');
            if (a.dims[0] !== 2) throw new Error('Input "past" first dimension must be 2');
            if (a.dims[1] !== l) throw new Error('Input "past" second dimension must be batch_size');
            if (a.dims[2] !== t.numHeads) throw new Error('Input "past" third dimension must be num_heads');
            if (a.dims[4] !== h / t.numHeads) throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');
            t.pastPresentShareBuffer || (g = a.dims[3]);
        }
        let x = y + g, $ = -1, v = 0;
        if (i) throw new Error("Mask not supported");
        if (a) throw new Error("past is not supported");
        if (d) {
            if (d.dims.length !== 4) throw new Error('Input "attention_bias" must have 4 dimensions');
            if (d.dims[0] !== l || d.dims[1] !== t.numHeads || d.dims[2] !== p || d.dims[3] !== x) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)');
        }
        return {
            batchSize: l,
            sequenceLength: p,
            pastSequenceLength: g,
            kvSequenceLength: y,
            totalSequenceLength: x,
            maxSequenceLength: $,
            inputHiddenSize: m,
            hiddenSize: u,
            vHiddenSize: _,
            headSize: Math.floor(u / t.numHeads),
            vHeadSize: Math.floor(_ / t.numHeads),
            numHeads: t.numHeads,
            isUnidirectional: !1,
            pastPresentShareBuffer: !1,
            maskFilterValue: t.maskFilterValue,
            maskType: v,
            scale: t.scale,
            broadcastResPosBias: !1,
            passPastInKv: !1,
            qkvFormat: 1
        };
    }, po = (e1, t, r)=>t && e1 ? "\n      let total_sequence_length_input = u32(".concat(t.getByOffset("0"), ");\n      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);\n      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;\n      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;\n      total_sequence_length = u32(").concat(e1 === null || e1 === void 0 ? void 0 : e1.getByOffset("batchIdx"), ") + 1;\n      var past_sequence_length: u32 = 0;\n      if (is_first_prompt == false) {\n        past_sequence_length = total_sequence_length - sequence_length;\n      }\n       ") : "\n    ".concat(r ? "let past_sequence_length = uniforms.past_sequence_length" : "", ";\n    let present_sequence_length = total_sequence_length;\n    "), Mm = (e1, t, r, n, o, i, a, d)=>{
        let l = me(a ? 1 : i), p = 64, m = i / l;
        m < p && (p = 32);
        let u = Math.ceil(i / l / p), h = [
            {
                type: 12,
                data: t
            },
            {
                type: 12,
                data: r
            },
            {
                type: 12,
                data: n
            },
            {
                type: 12,
                data: o
            },
            {
                type: 12,
                data: m
            },
            {
                type: 12,
                data: u
            }
        ], _ = _e(e1.dataType, l), y = Ee(1, l), g = [
            "type"
        ];
        a && g.push("type"), d && g.push("type");
        let x = ($)=>{
            let v = M("x", e1.dataType, e1.dims, l), S = [
                v
            ], T = a ? E("seq_lens", a.dataType, a.dims) : void 0;
            T && S.push(T);
            let A = d ? E("total_sequence_length_input", d.dataType, d.dims) : void 0;
            A && S.push(A);
            let k = Ee(e1.dataType), P = [
                {
                    name: "batch_size",
                    type: "u32"
                },
                {
                    name: "num_heads",
                    type: "u32"
                },
                {
                    name: "past_sequence_length",
                    type: "u32"
                },
                {
                    name: "sequence_length",
                    type: "u32"
                },
                {
                    name: "total_sequence_length",
                    type: "u32"
                },
                {
                    name: "elements_per_thread",
                    type: "u32"
                }
            ];
            return "\n  var<workgroup> thread_max: array<f32, ".concat(p, ">;\n  var<workgroup> thread_sum: array<f32, ").concat(p, ">;\n  ").concat($.registerUniforms(P).declareVariables(...S), "\n  ").concat($.mainStart([
                p,
                1,
                1
            ]), "\n    let batchIdx = workgroup_id.z / uniforms.num_heads;\n    let headIdx = workgroup_id.z % uniforms.num_heads;\n    let sequence_length = uniforms.sequence_length;\n    var total_sequence_length = uniforms.total_sequence_length;\n    ").concat(po(T, A, !1), "\n    let local_offset = local_idx * uniforms.elements_per_thread;\n    let offset = (global_idx / ").concat(p, ") * uniforms.total_sequence_length + local_offset;\n    let seq_causal_length = ").concat(a ? "u32(past_sequence_length + workgroup_id.y + 1)" : "total_sequence_length", ";\n    var thread_max_vector = ").concat(y, "(-3.402823e+38f);\n    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {\n      thread_max_vector = max(").concat(y, "(x[offset + i]), thread_max_vector);\n    }\n    thread_max[local_idx] = ").concat((()=>{
                switch(l){
                    case 1:
                        return "thread_max_vector";
                    case 2:
                        return "max(thread_max_vector.x, thread_max_vector.y)";
                    case 4:
                        return "max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";
                    default:
                        throw new Error("Unsupported components: ".concat(l));
                }
            })(), ";\n    workgroupBarrier();\n\n    var max_value =  f32(-3.402823e+38f);\n    for (var i = 0u; i < ").concat(p, "; i++) {\n      max_value = max(thread_max[i], max_value);\n    }\n\n    var sum_vector = ").concat(y, "(0);\n    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {\n      sum_vector += exp(").concat(y, "(x[offset + i]) - max_value);\n    }\n    thread_sum[local_idx] = ").concat((()=>{
                switch(l){
                    case 1:
                        return "sum_vector";
                    case 2:
                        return "sum_vector.x + sum_vector.y";
                    case 4:
                        return "sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";
                    default:
                        throw new Error("Unsupported components: ".concat(l));
                }
            })(), ";\n    workgroupBarrier();\n\n    var sum: f32 = 0;\n    for (var i = 0u; i < ").concat(p, "; i++) {\n      sum += thread_sum[i];\n    }\n\n    if (sum == 0) {\n      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {\n        x[offset + i] = ").concat(v.type.value, "(").concat(k, "(1.0) / ").concat(k, "(seq_causal_length));\n      }\n    } else {\n      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {\n        var f32input = ").concat(y, "(x[offset + i]);\n        x[offset + i] = ").concat(v.type.value, "(exp(f32input - max_value) / sum);\n      }\n    }\n      ").concat(a ? "\n        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {\n          x[offset + total_seq_id] = ".concat(v.type.value, "(").concat(k, "(0));\n        }") : "", ";\n  }");
        };
        return {
            name: "AttentionProbsSoftmax",
            shaderCache: {
                hint: "".concat(p, ";").concat(_, ";").concat(l),
                inputDependencies: g
            },
            getShaderSource: x,
            getRunData: ()=>({
                    outputs: [],
                    dispatchGroup: {
                        x: Math.ceil(i / p),
                        y: o,
                        z: t * r
                    },
                    programUniforms: h
                })
        };
    }, Rm = (e1, t, r, n, o, i, a, d, l)=>{
        let p = a + i.kvSequenceLength, m = [
            i.batchSize,
            i.numHeads,
            i.sequenceLength,
            p
        ], u = e1 > 1 && n, h = i.kvNumHeads ? i.kvNumHeads : i.numHeads, _ = u ? [
            i.batchSize,
            h,
            p,
            i.headSize
        ] : void 0, y = i.nReps ? i.nReps : 1, g = i.scale === 0 ? 1 / Math.sqrt(i.headSize) : i.scale, x = me(i.headSize), $ = i.headSize / x, v = 12, S = {
            x: Math.ceil(p / v),
            y: Math.ceil(i.sequenceLength / v),
            z: i.batchSize * i.numHeads
        }, T = [
            {
                type: 12,
                data: i.sequenceLength
            },
            {
                type: 12,
                data: $
            },
            {
                type: 12,
                data: p
            },
            {
                type: 12,
                data: i.numHeads
            },
            {
                type: 12,
                data: i.headSize
            },
            {
                type: 1,
                data: g
            },
            {
                type: 12,
                data: a
            },
            {
                type: 12,
                data: i.kvSequenceLength
            },
            {
                type: 12,
                data: y
            }
        ], A = u && n && C.size(n.dims) > 0, k = [
            "type",
            "type"
        ];
        A && k.push("type"), o && k.push("type"), d && k.push("type"), l && k.push("type");
        let P = [
            {
                dims: m,
                dataType: t.dataType,
                gpuDataType: 0
            }
        ];
        u && P.push({
            dims: _,
            dataType: t.dataType,
            gpuDataType: 0
        });
        let D = (R)=>{
            let G = E("q", t.dataType, t.dims, x), K = E("key", r.dataType, r.dims, x), j = [
                G,
                K
            ];
            if (A) {
                let ne = E("past_key", n.dataType, n.dims, x);
                j.push(ne);
            }
            o && j.push(E("attention_bias", o.dataType, o.dims));
            let V = d ? E("seq_lens", d.dataType, d.dims) : void 0;
            V && j.push(V);
            let Q = l ? E("total_sequence_length_input", l.dataType, l.dims) : void 0;
            Q && j.push(Q);
            let se = M("output", t.dataType, m), Y = [
                se
            ];
            u && Y.push(M("present_key", t.dataType, _, x));
            let ee = Ee(1, x), J = [
                {
                    name: "M",
                    type: "u32"
                },
                {
                    name: "K",
                    type: "u32"
                },
                {
                    name: "N",
                    type: "u32"
                },
                {
                    name: "num_heads",
                    type: "u32"
                },
                {
                    name: "head_size",
                    type: "u32"
                },
                {
                    name: "alpha",
                    type: "f32"
                },
                {
                    name: "past_sequence_length",
                    type: "u32"
                },
                {
                    name: "kv_sequence_length",
                    type: "u32"
                },
                {
                    name: "n_reps",
                    type: "u32"
                }
            ];
            return "\n  const TILE_SIZE = ".concat(v, "u;\n\n  var<workgroup> tileQ: array<").concat(G.type.storage, ", ").concat(v * v, ">;\n  var<workgroup> tileK: array<").concat(G.type.storage, ", ").concat(v * v, ">;\n  ").concat(R.registerUniforms(J).declareVariables(...j, ...Y), "\n  ").concat(R.mainStart([
                v,
                v,
                1
            ]), "\n    // x holds the N and y holds the M\n    let headIdx = workgroup_id.z % uniforms.num_heads;\n    let kvHeadIdx = ").concat(y === 1 ? "headIdx" : "headIdx / uniforms.n_reps", ";\n    let kv_num_heads = ").concat(y === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps", ";\n    let batchIdx = workgroup_id.z / uniforms.num_heads;\n    let m = workgroup_id.y * TILE_SIZE;\n    let n = workgroup_id.x * TILE_SIZE;\n    let sequence_length = uniforms.M;\n    var total_sequence_length = uniforms.N;\n    ").concat(po(V, Q, !0), "\n    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;\n    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;\n    ").concat(A && u ? "let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;" : "", ";\n    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;\n    ").concat(u ? "let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;" : "", "\n    var value = ").concat(ee, "(0);\n    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {\n      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {\n        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];\n      }\n      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {\n        var idx = TILE_SIZE * local_id.y + local_id.x;\n      ").concat((()=>A && u ? "\n              if (n + local_id.y < past_sequence_length) {\n                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];\n              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {\n                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];\n              }" : "\n          if (n + local_id.y < uniforms.kv_sequence_length) {\n            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];\n          }")(), "\n      ").concat(u ? "if (n + local_id.y < present_sequence_length) {\n        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];\n      }" : "", "\n      }\n      workgroupBarrier();\n\n      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {\n          value += ").concat(ee, "(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);\n      }\n\n      workgroupBarrier();\n    }\n\n    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {\n      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;\n      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;\n      var sum: f32 = ").concat((()=>{
                switch(x){
                    case 1:
                        return "value";
                    case 2:
                        return "value.x + value.y";
                    case 4:
                        return "value.x + value.y + value.z + value.w";
                    default:
                        throw new Error("Unsupported components: ".concat(x));
                }
            })(), ";\n        output[outputIdx] = ").concat(se.type.value, " (sum * uniforms.alpha) + ").concat(o ? "attention_bias[outputIdx]" : "0.0", ";\n    }\n  }");
        };
        return {
            name: "AttentionProbs",
            shaderCache: {
                hint: "".concat(x, ";").concat(o !== void 0, ";").concat(n !== void 0, ";").concat(e1),
                inputDependencies: k
            },
            getRunData: ()=>({
                    outputs: P,
                    dispatchGroup: S,
                    programUniforms: T
                }),
            getShaderSource: D
        };
    }, Um = function(e1, t, r, n, o, i) {
        let a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : void 0, d = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : void 0;
        let l = i + o.kvSequenceLength, p = o.nReps ? o.nReps : 1, m = o.vHiddenSize * p, u = e1 > 1 && n, h = o.kvNumHeads ? o.kvNumHeads : o.numHeads, _ = u ? [
            o.batchSize,
            h,
            l,
            o.headSize
        ] : void 0, y = [
            o.batchSize,
            o.sequenceLength,
            m
        ], g = 12, x = {
            x: Math.ceil(o.vHeadSize / g),
            y: Math.ceil(o.sequenceLength / g),
            z: o.batchSize * o.numHeads
        }, $ = [
            {
                type: 12,
                data: o.sequenceLength
            },
            {
                type: 12,
                data: l
            },
            {
                type: 12,
                data: o.vHeadSize
            },
            {
                type: 12,
                data: o.numHeads
            },
            {
                type: 12,
                data: o.headSize
            },
            {
                type: 12,
                data: m
            },
            {
                type: 12,
                data: i
            },
            {
                type: 12,
                data: o.kvSequenceLength
            },
            {
                type: 12,
                data: p
            }
        ], v = u && n && C.size(n.dims) > 0, S = [
            "type",
            "type"
        ];
        v && S.push("type"), a && S.push("type"), d && S.push("type");
        let T = [
            {
                dims: y,
                dataType: t.dataType,
                gpuDataType: 0
            }
        ];
        u && T.push({
            dims: _,
            dataType: t.dataType,
            gpuDataType: 0
        });
        let A = (k)=>{
            let P = E("probs", t.dataType, t.dims), D = E("v", r.dataType, r.dims), R = [
                P,
                D
            ];
            v && R.push(E("past_value", n.dataType, n.dims));
            let G = a ? E("seq_lens", a.dataType, a.dims) : void 0;
            a && R.push(G);
            let K = d ? E("total_sequence_length_input", d.dataType, d.dims) : void 0;
            d && R.push(K);
            let V = [
                M("output", t.dataType, y)
            ];
            u && V.push(M("present_value", t.dataType, _));
            let Q = [
                {
                    name: "M",
                    type: "u32"
                },
                {
                    name: "K",
                    type: "u32"
                },
                {
                    name: "N",
                    type: "u32"
                },
                {
                    name: "num_heads",
                    type: "u32"
                },
                {
                    name: "head_size",
                    type: "u32"
                },
                {
                    name: "v_hidden_size",
                    type: "u32"
                },
                {
                    name: "past_sequence_length",
                    type: "u32"
                },
                {
                    name: "kv_sequence_length",
                    type: "u32"
                },
                {
                    name: "n_reps",
                    type: "u32"
                }
            ];
            return "\n  const TILE_SIZE = ".concat(g, "u;\n  var<workgroup> tileQ: array<").concat(P.type.value, ", ").concat(g * g, ">;\n  var<workgroup> tileV: array<").concat(P.type.value, ", ").concat(g * g, ">;\n  ").concat(k.registerUniforms(Q).declareVariables(...R, ...V), "\n  ").concat(k.mainStart([
                g,
                g,
                1
            ]), "\n   let headIdx = workgroup_id.z % uniforms.num_heads;\n   let batchIdx = workgroup_id.z / uniforms.num_heads;\n   let kvHeadIdx = ").concat(p === 1 ? "headIdx" : "headIdx / uniforms.n_reps", ";\n   let kv_num_heads = ").concat(p === 1 ? "uniforms.num_heads" : "uniforms.num_heads / uniforms.n_reps", ";\n   let m = global_id.y;\n   let n = global_id.x;\n   let sequence_length = uniforms.M;\n   var total_sequence_length = uniforms.K;\n   ").concat(po(G, K, !0), "\n   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;\n   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch\n   ").concat(v && u ? "let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;" : "", ";\n   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;\n   ").concat(u ? "let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;" : "", "\n   var value = ").concat(P.type.storage, "(0);\n   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {\n      if (m < uniforms.M && w + local_id.x < uniforms.K) {\n        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];\n      }\n      if (n < uniforms.N && w + local_id.y < uniforms.K) {\n        var idx = TILE_SIZE * local_id.y + local_id.x;\n        ").concat((()=>v && u ? "\n        if (w + local_id.y < past_sequence_length) {\n          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];\n        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {\n          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];\n        }\n      " : "\n            if (w + local_id.y < uniforms.kv_sequence_length) {\n              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];\n            }")(), "\n        ").concat(u ? "\n            if (w + local_id.y < present_sequence_length) {\n          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];\n        }" : "", "\n      }\n     workgroupBarrier();\n     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {\n       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];\n     }\n     workgroupBarrier();\n   }\n\n   // we need to transpose output from BNSH_v to BSND_v\n   if (m < uniforms.M && n < uniforms.N) {\n     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size\n       + headIdx * uniforms.N + n;\n     output[outputIdx] = value;\n   }\n  }");
        };
        return {
            name: "AttentionScore",
            shaderCache: {
                hint: "".concat(n !== void 0, ";").concat(e1),
                inputDependencies: S
            },
            getRunData: ()=>({
                    outputs: T,
                    dispatchGroup: x,
                    programUniforms: $
                }),
            getShaderSource: A
        };
    }, Rt = function(e1, t, r, n, o, i, a, d, l, p) {
        let m = arguments.length > 10 && arguments[10] !== void 0 ? arguments[10] : void 0, u = arguments.length > 11 && arguments[11] !== void 0 ? arguments[11] : void 0;
        let h = Math.min(e1.outputCount, 1 + (a ? 1 : 0) + (d ? 1 : 0)), _ = h > 1 ? p.pastSequenceLength : 0, y = _ + p.kvSequenceLength, g = l && C.size(l.dims) > 0 ? l : void 0, x = [
            t,
            r
        ];
        h > 1 && a && C.size(a.dims) > 0 && x.push(a), g && x.push(g), m && x.push(m), u && x.push(u);
        let $ = e1.compute(Rm(h, t, r, a, g, p, _, m, u), {
            inputs: x,
            outputs: h > 1 ? [
                -1,
                1
            ] : [
                -1
            ]
        })[0];
        e1.compute(Mm($, p.batchSize, p.numHeads, _, p.sequenceLength, y, m, u), {
            inputs: m && u ? [
                $,
                m,
                u
            ] : [
                $
            ],
            outputs: []
        });
        let v = [
            $,
            n
        ];
        h > 1 && d && C.size(d.dims) > 0 && v.push(d), m && v.push(m), u && v.push(u), e1.compute(Um(h, $, n, d, p, _, m, u), {
            inputs: v,
            outputs: h > 1 ? [
                0,
                2
            ] : [
                0
            ]
        });
    }, Nm = (e1, t)=>{
        let r = [
            t.batchSize,
            t.numHeads,
            t.sequenceLength,
            t.headSize
        ], n = t.sequenceLength, o = t.inputHiddenSize, i = t.headSize, a = 12, d = {
            x: Math.ceil(t.headSize / a),
            y: Math.ceil(t.sequenceLength / a),
            z: t.batchSize * t.numHeads
        }, l = [
            e1.inputs[0],
            e1.inputs[1],
            e1.inputs[2]
        ], p = [
            {
                type: 12,
                data: n
            },
            {
                type: 12,
                data: o
            },
            {
                type: 12,
                data: i
            },
            {
                type: 12,
                data: t.numHeads
            },
            {
                type: 12,
                data: t.headSize
            },
            {
                type: 12,
                data: t.hiddenSize
            },
            {
                type: 12,
                data: t.hiddenSize + t.hiddenSize + t.vHiddenSize
            }
        ], m = (u)=>{
            let h = M("output_q", l[0].dataType, r), _ = M("output_k", l[0].dataType, r), y = M("output_v", l[0].dataType, r), g = E("input", l[0].dataType, l[0].dims), x = E("weight", l[1].dataType, l[1].dims), $ = E("bias", l[2].dataType, l[2].dims), v = g.type.storage, S = [
                {
                    name: "M",
                    type: "u32"
                },
                {
                    name: "K",
                    type: "u32"
                },
                {
                    name: "N",
                    type: "u32"
                },
                {
                    name: "num_heads",
                    type: "u32"
                },
                {
                    name: "head_size",
                    type: "u32"
                },
                {
                    name: "hidden_size",
                    type: "u32"
                },
                {
                    name: "ldb",
                    type: "u32"
                }
            ];
            return "\n  const TILE_SIZE = ".concat(a, "u;\n  var<workgroup> tileInput: array<").concat(v, ", ").concat(a * a, ">;\n  var<workgroup> tileWeightQ: array<").concat(v, ", ").concat(a * a, ">;\n  var<workgroup> tileWeightK: array<").concat(v, ", ").concat(a * a, ">;\n  var<workgroup> tileWeightV: array<").concat(v, ", ").concat(a * a, ">;\n  ").concat(u.registerUniforms(S).declareVariables(g, x, $, h, _, y), "\n  ").concat(u.mainStart([
                a,
                a,
                1
            ]), "\n    let batchIndex = workgroup_id.z / uniforms.num_heads;\n    let headNumber = workgroup_id.z % uniforms.num_heads;\n    let m = global_id.y;\n    let n = global_id.x;\n\n    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;\n    let biasOffsetQ = headNumber * uniforms.head_size;\n    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;\n    let biasOffsetV = uniforms.hidden_size + biasOffsetK;\n\n    var valueQ = ").concat(v, "(0);\n    var valueK = ").concat(v, "(0);\n    var valueV = ").concat(v, "(0);\n    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {\n      if (m < uniforms.M && w + local_id.x < uniforms.K) {\n        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];\n      }\n      if (n < uniforms.N && w + local_id.y < uniforms.K) {\n        let offset = n + (w + local_id.y) * uniforms.ldb;\n        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];\n        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];\n        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];\n      }\n      workgroupBarrier();\n      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {\n        let inputTileOffset = TILE_SIZE * local_id.y + k;\n        let weightTileOffset = TILE_SIZE * k + local_id.x;\n        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];\n        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];\n        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];\n      }\n\n      workgroupBarrier();\n    }\n\n    let headOffset = (m * uniforms.N + n) % uniforms.head_size;\n    valueQ += bias[headOffset + biasOffsetQ];\n    valueK += bias[headOffset + biasOffsetK];\n    valueV += bias[headOffset + biasOffsetV];\n\n    let offset = workgroup_id.z * uniforms.M * uniforms.N;\n    if (m < uniforms.M && n < uniforms.N) {\n      let outputIdx = offset + m * uniforms.N + n;\n      output_q[outputIdx] = valueQ;\n      output_k[outputIdx] = valueK;\n      output_v[outputIdx] = valueV;\n    }\n  }");
        };
        return e1.compute({
            name: "AttentionPrepare",
            shaderCache: {
                inputDependencies: [
                    "type",
                    "type",
                    "type"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: r,
                            dataType: e1.inputs[0].dataType,
                            gpuDataType: 0
                        },
                        {
                            dims: r,
                            dataType: e1.inputs[0].dataType,
                            gpuDataType: 0
                        },
                        {
                            dims: r,
                            dataType: e1.inputs[0].dataType,
                            gpuDataType: 0
                        }
                    ],
                    dispatchGroup: d,
                    programUniforms: p
                }),
            getShaderSource: m
        }, {
            inputs: l,
            outputs: [
                -1,
                -1,
                -1
            ]
        });
    }, zs = (e1, t)=>{
        let r = Bm(e1.inputs, t), [n, o, i] = Nm(e1, r);
        return Rt(e1, n, o, i, e1.inputs[4], void 0, void 0, void 0, e1.inputs[5], r);
    };
});
var Vm, Wm, Lm, Os, Ds = U(()=>{
    "use strict";
    We();
    te();
    oe();
    Se();
    ae();
    Vm = (e1, t)=>{
        if (!e1 || e1.length !== 5) throw new Error("BatchNormalization requires 5 inputs");
        let r = (n, o, i)=>{
            let a = o.length;
            if (a !== n.length) throw new Error("".concat(i, ": num dimensions != ").concat(a));
            o.forEach((d, l)=>{
                if (d !== n[l]) throw new Error("".concat(i, ": dim[").concat(l, "] do not match"));
            });
        };
        if (e1[0].dims.length > 1) {
            let n = t.format === "NHWC" ? t.spatial ? e1[0].dims.slice(-1) : e1[0].dims.slice(-1).concat(e1[0].dims.slice(1, e1[0].dims.length - 1)) : e1[0].dims.slice(1, t.spatial ? 2 : void 0);
            r(e1[1].dims, n, "Invalid input scale"), r(e1[2].dims, n, "Invalid input B"), r(e1[3].dims, n, "Invalid input mean"), r(e1[4].dims, n, "Invalid input var");
        } else r(e1[1].dims, [
            1
        ], "Invalid input scale"), r(e1[2].dims, [
            1
        ], "Invalid input B"), r(e1[3].dims, [
            1
        ], "Invalid input mean"), r(e1[4].dims, [
            1
        ], "Invalid input var");
    }, Wm = (e1, t)=>{
        let { epsilon: r, spatial: n, format: o } = t, i = e1[0].dims, a = n ? me(i[i.length - 1]) : 1, d = o === "NHWC" && i.length > 1 ? a : 1, l = C.size(i) / a, p = n, m = p ? i.length : i, u = E("x", e1[0].dataType, e1[0].dims, a), h = E("scale", e1[1].dataType, e1[1].dims, d), _ = E("bias", e1[2].dataType, e1[2].dims, d), y = E("inputMean", e1[3].dataType, e1[3].dims, d), g = E("inputVar", e1[4].dataType, e1[4].dims, d), x = M("y", e1[0].dataType, m, a), $ = ()=>{
            let S = "";
            if (n) S = "let cOffset = ".concat(i.length === 1 ? "0u" : o === "NHWC" ? "outputIndices[".concat(i.length - 1, "] / ").concat(a) : "outputIndices[1]", ";");
            else if (o === "NCHW") S = "\n            ".concat(x.indicesSet("outputIndices", "0", "0"), "\n            let cOffset = ").concat(x.indicesToOffset("outputIndices"), ";");
            else {
                S = "var cIndices = ".concat(h.type.indices, "(0);\n                       cIndices[0] = outputIndices[").concat(i.length - 1, "];");
                for(let T = 1; T < h.rank; T++)S += "cIndices[".concat(T, "] = outputIndices[").concat(T, "];");
                S += "let cOffset = ".concat(h.indicesToOffset("cIndices"), ";");
            }
            return S;
        }, v = (S)=>"\n  const epsilon = ".concat(r, ";\n  ").concat(S.registerUniform("outputSize", "u32").declareVariables(u, h, _, y, g, x), "\n  ").concat(S.mainStart(), "\n  ").concat(S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n    var outputIndices = ").concat(x.offsetToIndices("global_idx * ".concat(a)), ";\n    ").concat($(), "\n    let scale = ").concat(h.getByOffset("cOffset"), ";\n    let bias = ").concat(_.getByOffset("cOffset"), ";\n    let inputMean = ").concat(y.getByOffset("cOffset"), ";\n    let inputVar = ").concat(g.getByOffset("cOffset"), ";\n    let x = ").concat(u.getByOffset("global_idx"), ";\n    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;\n    ").concat(x.setByOffset("global_idx", "value"), "\n  }");
        return {
            name: "BatchNormalization",
            shaderCache: {
                hint: "".concat(t.epsilon, "_").concat(t.format, "_").concat(n, "_").concat(a),
                inputDependencies: p ? [
                    "rank",
                    "type",
                    "type",
                    "type",
                    "type"
                ] : void 0
            },
            getShaderSource: v,
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: e1[0].dims,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(l / 64)
                    },
                    programUniforms: p ? [
                        {
                            type: 12,
                            data: l
                        },
                        ...N(i)
                    ] : [
                        {
                            type: 12,
                            data: l
                        }
                    ]
                })
        };
    }, Lm = (e1)=>re(e1), Os = (e1, t)=>{
        let { inputs: r, outputCount: n } = e1, o = Lm({
            ...t,
            outputCount: n
        });
        if (ve.webgpu.validateInputContent && Vm(r, o), t.trainingMode) throw new Error("BatchNormalization trainingMode is not supported yet.");
        e1.compute(Wm(r, o));
    };
});
var Gm, Hm, Bs, Ms = U(()=>{
    "use strict";
    oe();
    ae();
    Gm = (e1)=>{
        if (e1[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
        if (![
            320,
            640,
            1280
        ].includes(e1[0].dims[2])) throw new Error("number of channels should be 320, 640 or 1280");
        if (e1[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
        if (e1[0].dims[2] !== e1[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
    }, Hm = (e1)=>{
        let t = e1[0].dims, r = e1[0].dims[2], n = C.size(t) / 4, o = e1[0].dataType, i = E("input", o, t, 4), a = E("bias", o, [
            r
        ], 4), d = E("residual", o, t, 4), l = M("output", o, t, 4);
        return {
            name: "BiasAdd",
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: t,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(n / 64)
                    }
                }),
            getShaderSource: (m)=>"\n  const channels = ".concat(r, "u / 4;\n  ").concat(m.declareVariables(i, a, d, l), "\n\n  ").concat(m.mainStart(), "\n    ").concat(m.guardAgainstOutOfBoundsWorkgroupSizes(n), "\n    let value = ").concat(i.getByOffset("global_idx"), "\n      + ").concat(a.getByOffset("global_idx % channels"), " + ").concat(d.getByOffset("global_idx"), ";\n    ").concat(l.setByOffset("global_idx", "value"), "\n  }")
        };
    }, Bs = (e1)=>{
        Gm(e1.inputs), e1.compute(Hm(e1.inputs));
    };
});
var Fm, fe, Rs, Us, Ns, Vs, Ws, Ls, Gs, Hs, Fs, qm, qs, Ks, js, Ys, Xt, Zs, qr, Qs, Xs, Js, eu, tu, ru, nu, ou, iu, au, su, uu, du, lu, cu, pu, mu, fu, mo, fo, hu, gu, bu, Km, jm, yu, Kr = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Fm = (e1, t, r, n, o, i, a)=>{
        let d = Math.ceil(t / 4), l = "";
        typeof o == "string" ? l = "".concat(o, "(a)") : l = o("a");
        let p = E("inputData", r, [
            d
        ], 4), m = M("outputData", n, [
            d
        ], 4), u = [
            {
                name: "vec_size",
                type: "u32"
            }
        ];
        return a && u.push(...a), "\n      ".concat(e1.registerUniforms(u).declareVariables(p, m), "\n\n  ").concat(i !== null && i !== void 0 ? i : "", "\n\n  ").concat(e1.mainStart(), "\n    ").concat(e1.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size"), "\n\n    let a = ").concat(p.getByOffset("global_idx"), ";\n    ").concat(m.setByOffset("global_idx", l), "\n  }");
    }, fe = function(e1, t, r, n, o) {
        let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : e1.dataType, a = arguments.length > 6 ? arguments[6] : void 0, d = arguments.length > 7 ? arguments[7] : void 0;
        let l = [
            {
                type: 12,
                data: Math.ceil(C.size(e1.dims) / 4)
            }
        ];
        return a && l.push(...a), {
            name: t,
            shaderCache: {
                hint: o,
                inputDependencies: [
                    "type"
                ]
            },
            getShaderSource: (p)=>Fm(p, C.size(e1.dims), e1.dataType, i, r, n, d),
            getRunData: (p)=>({
                    outputs: [
                        {
                            dims: e1.dims,
                            dataType: i
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(C.size(p[0].dims) / 64 / 4)
                    },
                    programUniforms: l
                })
        };
    }, Rs = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Abs", "abs"));
    }, Us = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Acos", "acos"));
    }, Ns = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Acosh", "acosh"));
    }, Vs = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Asin", "asin"));
    }, Ws = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Asinh", "asinh"));
    }, Ls = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Atan", "atan"));
    }, Gs = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Atanh", "atanh"));
    }, Hs = (e1)=>re(e1), Fs = (e1, t)=>{
        let r;
        switch(t.to){
            case 10:
                r = "vec4<f16>";
                break;
            case 1:
                r = "vec4<f32>";
                break;
            case 12:
                r = "vec4<u32>";
                break;
            case 6:
                r = "vec4<i32>";
                break;
            case 9:
                r = "vec4<bool>";
                break;
            default:
                throw new RangeError("not supported type (specified in attribute 'to' from 'Cast' operator): ".concat(t.to));
        }
        e1.compute(fe(e1.inputs[0], "Cast", r, void 0, t.cacheKey, t.to));
    }, qm = (e1)=>{
        let t, r, n = e1.length >= 2 && e1[1].data !== 0, o = e1.length >= 3 && e1[2].data !== 0;
        switch(e1[0].dataType){
            case 1:
                t = n ? e1[1].getFloat32Array()[0] : -34028234663852886e22, r = o ? e1[2].getFloat32Array()[0] : 34028234663852886e22;
                break;
            case 10:
                t = n ? e1[1].getUint16Array()[0] : 64511, r = o ? e1[2].getUint16Array()[0] : 31743;
                break;
            default:
                throw new Error("Unsupport data type");
        }
        return re({
            min: t,
            max: r
        });
    }, qs = (e1, t)=>{
        let r = t || qm(e1.inputs), n = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "Clip", (o)=>"clamp(".concat(o, ", vec4<").concat(n, ">(uniforms.min), vec4<").concat(n, ">(uniforms.max))"), void 0, r.cacheKey, void 0, [
            {
                type: e1.inputs[0].dataType,
                data: r.min
            },
            {
                type: e1.inputs[0].dataType,
                data: r.max
            }
        ], [
            {
                name: "min",
                type: n
            },
            {
                name: "max",
                type: n
            }
        ]), {
            inputs: [
                0
            ]
        });
    }, Ks = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Ceil", "ceil"));
    }, js = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Cos", "cos"));
    }, Ys = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Cosh", "cosh"));
    }, Xt = (e1)=>re(e1), Zs = (e1, t)=>{
        let r = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "Elu", (n)=>"elu_vf32(".concat(n, ")"), "\n  const elu_alpha_ = ".concat(r, "(").concat(t.alpha, ");\n\n  fn elu_f32(a: ").concat(r, ") -> ").concat(r, " {\n  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);\n  }\n\n  fn elu_vf32(v: vec4<").concat(r, ">) -> vec4<").concat(r, "> {\n  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));\n  }"), t.cacheKey));
    }, qr = function() {
        let e1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "f32";
        return "\nconst r0: ".concat(e1, " = 0.3275911;\nconst r1: ").concat(e1, " = 0.254829592;\nconst r2: ").concat(e1, " = -0.284496736;\nconst r3: ").concat(e1, " = 1.421413741;\nconst r4: ").concat(e1, " = -1.453152027;\nconst r5: ").concat(e1, " = 1.061405429;\n\nfn erf_vf32(v: vec4<").concat(e1, ">) -> vec4<").concat(e1, "> {\n  let absv = abs(v);\n  let x = 1.0 / (1.0 + r0 * absv);\n  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));\n}");
    }, Qs = (e1)=>{
        let t = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "Erf", (r)=>"erf_vf32(".concat(r, ")"), qr(t)));
    }, Xs = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Exp", "exp"));
    }, Js = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Floor", "floor"));
    }, eu = (e1)=>{
        let t = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "Gelu", (r)=>"0.5 * ".concat(r, " * (1.0 + erf_vf32(").concat(r, " * 0.7071067811865475))"), qr(t)));
    }, tu = (e1, t)=>{
        let r = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "LeakyRelu", (n)=>"select(leaky_relu_alpha_ * ".concat(n, ", ").concat(n, ", ").concat(n, " >= vec4<").concat(r, ">(0.0))"), "const leaky_relu_alpha_ = ".concat(r, "(").concat(t.alpha, ");"), t.cacheKey));
    }, ru = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Not", (t)=>"!".concat(t)));
    }, nu = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Neg", (t)=>"-".concat(t)));
    }, ou = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Reciprocal", (t)=>"1.0/".concat(t)));
    }, iu = (e1)=>{
        let t = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "Relu", (r)=>"select(vec4<".concat(t, ">(0.0), ").concat(r, ", ").concat(r, " > vec4<").concat(t, ">(0.0))")));
    }, au = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Sigmoid", (t)=>"(1.0 / (1.0 + exp(-".concat(t, ")))")));
    }, su = (e1)=>re(e1), uu = (e1, t)=>{
        let r = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "HardSigmoid", (n)=>"max(vec4<".concat(r, ">(0.0), min(vec4<").concat(r, ">(1.0), ").concat(t.alpha, " * ").concat(n, " + vec4<").concat(r, ">(").concat(t.beta, ")))"), void 0, t.cacheKey));
    }, du = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Sin", "sin"));
    }, lu = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Sinh", "sinh"));
    }, cu = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Sqrt", "sqrt"));
    }, pu = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Tan", "tan"));
    }, mu = (e1)=>"sign(".concat(e1, ") * (1 - exp(-2 * abs(").concat(e1, "))) / (1 + exp(-2 * abs(").concat(e1, ")))"), fu = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Tanh", mu));
    }, mo = function() {
        let e1 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "f32";
        return "\nconst fast_gelu_a: ".concat(e1, " = 0.5;\nconst fast_gelu_b: ").concat(e1, " = 0.7978845608028654;\nconst fast_gelu_c: ").concat(e1, " = 0.035677408136300125;\n\nfn tanh_v(v: vec4<").concat(e1, ">) -> vec4<").concat(e1, "> {\n  return ").concat(mu("v"), ";\n}\n");
    }, fo = (e1)=>"(fast_gelu_a + fast_gelu_a * tanh_v(".concat(e1, " * (fast_gelu_c * ").concat(e1, " * ").concat(e1, " + fast_gelu_b))) * ").concat(e1), hu = (e1)=>{
        let t = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "FastGelu", fo, mo(t), void 0, e1.inputs[0].dataType));
    }, gu = (e1, t)=>{
        let r = Ee(e1.inputs[0].dataType);
        return e1.compute(fe(e1.inputs[0], "ThresholdedRelu", (n)=>"select(vec4<".concat(r, ">(0.0), ").concat(n, ", ").concat(n, " > thresholded_relu_alpha_)"), "const thresholded_relu_alpha_ = vec4<".concat(r, ">(").concat(t.alpha, ");"), t.cacheKey)), 0;
    }, bu = (e1)=>{
        e1.compute(fe(e1.inputs[0], "Log", "log"));
    }, Km = (e1, t)=>"\nconst alpha = vec4<".concat(e1, ">(").concat(t, ");\nconst one = ").concat(e1, "(1.0);\nconst zero = ").concat(e1, "(0.0);\n\nfn quick_gelu_impl(x: vec4<").concat(e1, ">) -> vec4<").concat(e1, "> {\n  let v = x *alpha;\n  var x1 : vec4<").concat(e1, ">;\n  for (var i = 0; i < 4; i = i + 1) {\n    if (v[i] >= zero) {\n      x1[i] = one / (one + exp(-v[i]));\n    } else {\n      x1[i] = one - one / (one + exp(v[i]));\n    }\n  }\n  return x * x1;\n}\n"), jm = (e1)=>"quick_gelu_impl(".concat(e1, ")"), yu = (e1, t)=>{
        let r = Ee(e1.inputs[0].dataType);
        e1.compute(fe(e1.inputs[0], "QuickGelu", jm, Km(r, t.alpha), t.cacheKey, e1.inputs[0].dataType));
    };
});
var Ym, Zm, wu, vu = U(()=>{
    "use strict";
    oe();
    ae();
    Kr();
    Ym = (e1)=>{
        if (e1[0].dims.length !== 3) throw new Error("input should have 3 dimensions");
        if (![
            2560,
            5120,
            10240
        ].includes(e1[0].dims[2])) throw new Error("hidden state should be 2560, 5120 or 10240");
        if (e1[1].dims.length !== 1) throw new Error("bias is expected to have 1 dimensions");
        if (e1[0].dims[2] !== e1[1].dims[0]) throw new Error("last dimension of input and bias are not the same");
    }, Zm = (e1)=>{
        let t = e1[0].dims.slice();
        t[2] = t[2] / 2;
        let r = E("input", e1[0].dataType, e1[0].dims, 4), n = E("bias", e1[0].dataType, [
            e1[0].dims[2]
        ], 4), o = M("output", e1[0].dataType, t, 4), i = C.size(t) / 4, a = _e(e1[0].dataType);
        return {
            name: "BiasSplitGelu",
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: t,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(i / 64)
                    }
                }),
            getShaderSource: (l)=>"\n  const M_SQRT2 = sqrt(2.0);\n  const halfChannels = ".concat(e1[0].dims[2] / 4 / 2, "u;\n\n  ").concat(l.declareVariables(r, n, o), "\n\n  ").concat(qr(a), "\n\n  ").concat(l.mainStart(), "\n    ").concat(l.guardAgainstOutOfBoundsWorkgroupSizes(i), "\n    let biasIdx = global_idx % halfChannels;\n    let batchIndex = global_idx / halfChannels;\n    let inputOffset = biasIdx + batchIndex * halfChannels * 2;\n    let valueLeft = input[inputOffset] + bias[biasIdx];\n    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];\n    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);\n\n    ").concat(o.setByOffset("global_idx", "valueLeft * geluRight"), "\n  }")
        };
    }, wu = (e1)=>{
        Ym(e1.inputs), e1.compute(Zm(e1.inputs));
    };
});
var Qm, Xm, at, $u, xu, Su, Tu, Iu, Cu, Au, ku, Eu, Pu, zu = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    Qm = (e1, t, r, n, o, i, a, d, l, p, m, u)=>{
        let h, _;
        typeof d == "string" ? h = _ = (v, S)=>"".concat(d, "((").concat(v, "),(").concat(S, "))") : typeof d == "function" ? h = _ = d : (h = d.scalar, _ = d.vector);
        let y = M("outputData", m, n.length, 4), g = E("aData", l, t.length, 4), x = E("bData", p, r.length, 4), $;
        if (o) if (i) {
            let v = C.size(t) === 1, S = C.size(r) === 1, T = t.length > 0 && t[t.length - 1] % 4 === 0, A = r.length > 0 && r[r.length - 1] % 4 === 0;
            v || S ? $ = y.setByOffset("global_idx", _(v ? "".concat(g.type.value, "(").concat(g.getByOffset("0"), ".x)") : g.getByOffset("global_idx"), S ? "".concat(x.type.value, "(").concat(x.getByOffset("0"), ".x)") : x.getByOffset("global_idx"))) : $ = "\n            let outputIndices = ".concat(y.offsetToIndices("global_idx * 4u"), ";\n            let offsetA = ").concat(g.broadcastedIndicesToOffset("outputIndices", y), ";\n            let offsetB = ").concat(x.broadcastedIndicesToOffset("outputIndices", y), ";\n            ").concat(y.setByOffset("global_idx", _(a || T ? g.getByOffset("offsetA / 4u") : "".concat(g.type.value, "(").concat(g.getByOffset("offsetA / 4u"), "[offsetA % 4u])"), a || A ? x.getByOffset("offsetB / 4u") : "".concat(x.type.value, "(").concat(x.getByOffset("offsetB / 4u"), "[offsetB % 4u])"))), "\n          ");
        } else $ = y.setByOffset("global_idx", _(g.getByOffset("global_idx"), x.getByOffset("global_idx")));
        else {
            if (!i) throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");
            let v = function(S, T) {
                let A = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
                let k = "aData[indexA".concat(T, "][componentA").concat(T, "]"), P = "bData[indexB".concat(T, "][componentB").concat(T, "]");
                return "\n            let outputIndices".concat(T, " = ").concat(y.offsetToIndices("global_idx * 4u + ".concat(T, "u")), ";\n            let offsetA").concat(T, " = ").concat(g.broadcastedIndicesToOffset("outputIndices".concat(T), y), ";\n            let offsetB").concat(T, " = ").concat(x.broadcastedIndicesToOffset("outputIndices".concat(T), y), ";\n            let indexA").concat(T, " = offsetA").concat(T, " / 4u;\n            let indexB").concat(T, " = offsetB").concat(T, " / 4u;\n            let componentA").concat(T, " = offsetA").concat(T, " % 4u;\n            let componentB").concat(T, " = offsetB").concat(T, " % 4u;\n            ").concat(S, "[").concat(T, "] = ").concat(A, "(").concat(h(k, P), ");\n          ");
            };
            m === 9 ? $ = "\n            var data = vec4<u32>(0);\n            ".concat(v("data", 0, "u32"), "\n            ").concat(v("data", 1, "u32"), "\n            ").concat(v("data", 2, "u32"), "\n            ").concat(v("data", 3, "u32"), "\n            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));") : $ = "\n            ".concat(v("outputData[global_idx]", 0), "\n            ").concat(v("outputData[global_idx]", 1), "\n            ").concat(v("outputData[global_idx]", 2), "\n            ").concat(v("outputData[global_idx]", 3), "\n          ");
        }
        return "\n        ".concat(e1.registerUniform("vec_size", "u32").declareVariables(g, x, y), "\n\n        ").concat(u !== null && u !== void 0 ? u : "", "\n\n        ").concat(e1.mainStart(), "\n        ").concat(e1.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size"), "\n        ").concat($, "\n      }");
    }, Xm = function(e1, t, r, n, o, i) {
        let a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : r.dataType;
        let d = r.dims.map((g)=>{
            var _Number;
            return (_Number = Number(g)) !== null && _Number !== void 0 ? _Number : 1;
        }), l = n.dims.map((g)=>{
            var _Number;
            return (_Number = Number(g)) !== null && _Number !== void 0 ? _Number : 1;
        }), p = !C.areEqual(d, l), m = d, u = C.size(d), h = !1, _ = !1, y = [
            p
        ];
        if (p) {
            let g = tt.calcShape(d, l, !1);
            if (!g) throw new Error("Can't perform binary op on the given tensors");
            m = g.slice(), u = C.size(m);
            let x = C.size(d) === 1, $ = C.size(l) === 1, v = d.length > 0 && d[d.length - 1] % 4 === 0, S = l.length > 0 && l[l.length - 1] % 4 === 0;
            y.push(x), y.push($), y.push(v), y.push(S);
            let T = 1;
            for(let A = 1; A < m.length; A++){
                let k = d[d.length - A], P = l[l.length - A];
                if (k === P) T *= k;
                else break;
            }
            T % 4 === 0 ? (_ = !0, h = !0) : (x || $ || v || S) && (h = !0);
        } else h = !0;
        return y.push(h), {
            name: e1,
            shaderCache: {
                hint: t + y.map((g)=>g.toString()).join("_"),
                inputDependencies: [
                    "rank",
                    "rank"
                ]
            },
            getShaderSource: (g)=>Qm(g, d, l, m, h, p, _, o, r.dataType, n.dataType, a, i),
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: m,
                            dataType: a
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(u / 64 / 4)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: Math.ceil(C.size(m) / 4)
                        },
                        ...N(d, l, m)
                    ]
                })
        };
    }, at = (e1, t, r, n, o, i)=>{
        e1.compute(Xm(t, o !== null && o !== void 0 ? o : "", e1.inputs[0], e1.inputs[1], r, n, i));
    }, $u = (e1)=>{
        at(e1, "Add", (t, r)=>"".concat(t, "+").concat(r));
    }, xu = (e1)=>{
        at(e1, "Div", (t, r)=>"".concat(t, "/").concat(r));
    }, Su = (e1)=>{
        at(e1, "Equal", {
            scalar: (t, r)=>"u32(".concat(t, "==").concat(r, ")"),
            vector: (t, r)=>"vec4<u32>(".concat(t, "==").concat(r, ")")
        }, void 0, void 0, 9);
    }, Tu = (e1)=>{
        at(e1, "Mul", (t, r)=>"".concat(t, "*").concat(r));
    }, Iu = (e1)=>{
        let t = E("input", e1.inputs[0].dataType, e1.inputs[0].dims).type.value;
        at(e1, "Pow", {
            scalar: (n, o)=>"pow_custom(".concat(n, ",").concat(o, ")"),
            vector: (n, o)=>"pow_vector_custom(".concat(n, ",").concat(o, ")")
        }, "\n    fn pow_custom(a : ".concat(t, ", b : ").concat(t, ") -> ").concat(t, " {\n      if (b == ").concat(t, "(0.0)) {\n        return ").concat(t, "(1.0);\n      } else if (a < ").concat(t, "(0.0) && f32(b) != floor(f32(b))) {\n        return ").concat(t, "(pow(f32(a), f32(b))); // NaN\n      }\n      return select(sign(a), ").concat(t, "(1.0), round(f32(abs(b) % ").concat(t, "(2.0))) != 1.0) * ").concat(t, "(").concat(t === "i32" ? "round" : "", "(pow(f32(abs(a)), f32(b))));\n    }\n    fn pow_vector_custom(a : vec4<").concat(t, ">, b : vec4<").concat(t, ">) -> vec4<").concat(t, "> {\n      // TODO: implement vectorized pow\n      return vec4<").concat(t, ">(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));\n    }\n      "));
    }, Cu = (e1)=>{
        at(e1, "Sub", (t, r)=>"".concat(t, "-").concat(r));
    }, Au = (e1)=>{
        at(e1, "Greater", {
            scalar: (t, r)=>"u32(".concat(t, ">").concat(r, ")"),
            vector: (t, r)=>"vec4<u32>(".concat(t, ">").concat(r, ")")
        }, void 0, void 0, 9);
    }, ku = (e1)=>{
        at(e1, "Less", {
            scalar: (t, r)=>"u32(".concat(t, "<").concat(r, ")"),
            vector: (t, r)=>"vec4<u32>(".concat(t, "<").concat(r, ")")
        }, void 0, void 0, 9);
    }, Eu = (e1)=>{
        at(e1, "GreaterOrEqual", {
            scalar: (t, r)=>"u32(".concat(t, ">=").concat(r, ")"),
            vector: (t, r)=>"vec4<u32>(".concat(t, ">=").concat(r, ")")
        }, void 0, void 0, 9);
    }, Pu = (e1)=>{
        at(e1, "LessOrEqual", {
            scalar: (t, r)=>"u32(".concat(t, "<=").concat(r, ")"),
            vector: (t, r)=>"vec4<u32>(".concat(t, "<=").concat(r, ")")
        }, void 0, void 0, 9);
    };
});
var ef, tf, rf, nf, Ou, Du, Bu = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    ef = (e1, t)=>{
        if (!e1 || e1.length < 1) throw new Error("too few inputs");
        let r = 0, n = e1[r], o = n.dataType, i = n.dims.length;
        e1.forEach((a, d)=>{
            if (d !== r) {
                if (a.dataType !== o) throw new Error("input tensors should be one type");
                if (a.dims.length !== i) throw new Error("input tensors should have the same shape");
                a.dims.forEach((l, p)=>{
                    if (p !== t && l !== n.dims[p]) throw new Error("non concat dimensions must match");
                });
            }
        });
    }, tf = (e1, t)=>"\n  fn calculateInputIndex(index: u32) -> u32 {\n    let sizeInConcatAxis = array<u32, ".concat(e1, "u>(").concat(t, ");\n    for (var i: u32 = 0u; i < ").concat(e1, "; i += 1u ) {\n      if (index < sizeInConcatAxis[i]) {\n        return i;\n      }\n    }\n    return ").concat(e1, "u;\n  }"), rf = (e1, t)=>{
        let r = e1.length, n = [];
        for(let o = 0; o < r; ++o){
            let i = t.setByOffset("global_idx", e1[o].getByIndices("indices"));
            r === 1 ? n.push(i) : o === 0 ? n.push("if (inputIndex == ".concat(o, "u) { ").concat(i, " }")) : o === r - 1 ? n.push("else { ".concat(i, " }")) : n.push("else if (inputIndex == ".concat(o, ") { ").concat(i, " }"));
        }
        return n.join("\n");
    }, nf = (e1, t, r, n)=>{
        let o = C.size(r), i = new Array(e1.length), a = new Array(e1.length), d = 0, l = [], p = [], m = [
            {
                type: 12,
                data: o
            }
        ];
        for(let g = 0; g < e1.length; ++g)d += e1[g].dims[t], i[g] = d, p.push(e1[g].dims.length), a[g] = E("input".concat(g), n, p[g]), l.push("rank"), m.push({
            type: 12,
            data: i[g]
        });
        for(let g = 0; g < e1.length; ++g)m.push(...N(e1[g].dims));
        m.push(...N(r));
        let u = M("output", n, r.length), h = u.indicesGet("indices", t), _ = Array.from(Array(i.length).keys()).map((g)=>"uniforms.sizeInConcatAxis".concat(g)).join(","), y = (g)=>"\n\n  ".concat((()=>{
                g.registerUniform("outputSize", "u32");
                for(let x = 0; x < e1.length; x++)g.registerUniform("sizeInConcatAxis".concat(x), "u32");
                return g.declareVariables(...a, u);
            })(), "\n\n  ").concat(tf(i.length, _), "\n\n  ").concat(g.mainStart(), "\n    ").concat(g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n\n    var indices = ").concat(u.offsetToIndices("global_idx"), ";\n\n    let inputIndex = calculateInputIndex(").concat(h, ");\n    if (inputIndex != 0u) {\n      let sizeInConcatAxis = array<u32, ").concat(i.length, "u>(").concat(_, ");\n      ").concat(h, " -= sizeInConcatAxis[inputIndex - 1u];\n    }\n\n    ").concat(rf(a, u), "\n  }");
        return {
            name: "Concat",
            shaderCache: {
                hint: "".concat(t),
                inputDependencies: l
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: r,
                            dataType: n
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(o / 64)
                    },
                    programUniforms: m
                }),
            getShaderSource: y
        };
    }, Ou = (e1, t)=>{
        let r = e1.inputs, n = r[0].dims, o = C.normalizeAxis(t.axis, n.length);
        ef(r, o);
        let i = n.slice();
        i[o] = r.reduce((d, l)=>d + (l.dims.length > o ? l.dims[o] : 0), 0);
        let a = r.filter((d)=>C.size(d.dims) > 0);
        e1.compute(nf(a, o, i, r[0].dataType), {
            inputs: a
        });
    }, Du = (e1)=>re({
            axis: e1.axis
        });
});
var qe, Ke, je, jr, yt = U(()=>{
    "use strict";
    te();
    oe();
    qe = function(e1, t) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "f32";
        switch(e1.activation){
            case "Relu":
                return "value = max(value, ".concat(t, "(0.0));");
            case "Sigmoid":
                return "value = (".concat(t, "(1.0) / (").concat(t, "(1.0) + exp(-value)));");
            case "Clip":
                return "value = clamp(value, ".concat(t, "(").concat(r, "(uniforms.clip_min)), ").concat(t, "(").concat(r, "(uniforms.clip_max)));");
            case "HardSigmoid":
                return "value = max(".concat(t, "(0.0), min(").concat(t, "(1.0), ").concat(r, "(uniforms.alpha) * value + ").concat(r, "(uniforms.beta)));");
            case "LeakyRelu":
                return "value = select(".concat(r, "(uniforms.alpha) * value, value, value >= ").concat(t, "(0.0));");
            case "Tanh":
                return "let e2x = exp(-2.0 * abs(value));\n              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);\n        ";
            case "":
                return "";
            default:
                throw new Error("Unsupported activation ".concat(e1.activation));
        }
    }, Ke = (e1, t)=>{
        e1.activation === "Clip" ? t.push({
            type: 1,
            data: e1.clipMax
        }, {
            type: 1,
            data: e1.clipMin
        }) : e1.activation === "HardSigmoid" ? t.push({
            type: 1,
            data: e1.alpha
        }, {
            type: 1,
            data: e1.beta
        }) : e1.activation === "LeakyRelu" && t.push({
            type: 1,
            data: e1.alpha
        });
    }, je = (e1, t)=>{
        e1.activation === "Clip" ? t.push({
            name: "clip_max",
            type: "f32"
        }, {
            name: "clip_min",
            type: "f32"
        }) : e1.activation === "HardSigmoid" ? t.push({
            name: "alpha",
            type: "f32"
        }, {
            name: "beta",
            type: "f32"
        }) : e1.activation === "LeakyRelu" && t.push({
            name: "alpha",
            type: "f32"
        });
    }, jr = (e1)=>{
        let t = (e1 === null || e1 === void 0 ? void 0 : e1.activation) || "";
        if (t === "HardSigmoid") {
            let [r, n] = (e1 === null || e1 === void 0 ? void 0 : e1.activation_params) || [
                .2,
                .5
            ];
            return {
                activation: t,
                alpha: r,
                beta: n
            };
        } else if (t === "Clip") {
            let [r, n] = (e1 === null || e1 === void 0 ? void 0 : e1.activation_params) || [
                es,
                ts
            ];
            return {
                activation: t,
                clipMax: n,
                clipMin: r
            };
        } else if (t === "LeakyRelu") {
            let [r] = (e1 === null || e1 === void 0 ? void 0 : e1.activation_params) || [
                .01
            ];
            return {
                activation: t,
                alpha: r
            };
        }
        return {
            activation: t
        };
    };
});
var Ae, Mu, Yr = U(()=>{
    "use strict";
    Ae = (e1, t)=>{
        switch(e1){
            case 1:
                return t;
            case 2:
                return "vec2<".concat(t, ">");
            case 3:
                return "vec3<".concat(t, ">");
            case 4:
                return "vec4<".concat(t, ">");
            default:
                throw new Error("".concat(e1, "-component is not supported."));
        }
    }, Mu = (e1)=>"\n      ".concat(e1 ? "value = value + getBiasByOutputCoords(coords);" : "", "\n      ");
});
var Ru, Uu = U(()=>{
    "use strict";
    Ru = (e1)=>"\nfn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {\n  return dot(coords, vec4<i32>(\n      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));\n}\nfn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {\n  return dot(coords, vec4<i32>(\n    i32(".concat(e1, ".x), i32(").concat(e1, ".y), i32(").concat(e1, ".z), 1));\n}\n");
});
var Jt, Zr, Qr = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    yt();
    Jt = (e1, t, r, n, o)=>{
        let i = n - r;
        return "\n      ".concat(Array.from({
            length: r
        }).map((a, d)=>"\n      if (".concat(F(t.shape, d, t.rank), " != 1) {\n        ").concat(t.indicesSet(e1, d, F(o, d + i, n)), "\n      } else {\n        ").concat(t.indicesSet(e1, d, 0), "\n      }")).join(""), "\n");
    }, Zr = function(e1, t, r, n) {
        let o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, i = arguments.length > 5 ? arguments[5] : void 0;
        let a = e1[0].dims, d = e1[1].dims, l = a[a.length - 2], p = d[d.length - 1], m = a[a.length - 1], u = me(p), h = me(m), _ = me(l), y = C.size(r) / u / _, g = e1.length > 2, x = n ? n.slice(0, -2) : r.slice(0, -2), v = [
            C.size(x),
            l,
            p
        ], S = [
            {
                type: 12,
                data: y
            },
            {
                type: 12,
                data: l
            },
            {
                type: 12,
                data: p
            },
            {
                type: 12,
                data: m
            }
        ];
        Ke(t, S), S.push(...N(x, a, d)), g && S.push(...N(e1[2].dims)), S.push(...N(v));
        let T = (A)=>{
            let k = Lr("batch_dims", e1[0].dataType, x.length), P = E("a", e1[0].dataType, a.length, h), D = E("b", e1[1].dataType, d.length, u), R = M("output", e1[0].dataType, v.length, u), G = _e(R.type.tensor), K = qe(t, R.type.value, G), j = [
                P,
                D
            ], V = "";
            if (g) {
                let Y = o ? u : 1;
                j.push(E("bias", e1[2].dataType, e1[2].dims.length, Y)), V = "".concat(o ? "value += bias[col / ".concat(Y, "];") : "value += ".concat(R.type.value, "(bias[row + i]);"));
            }
            let Q = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "M",
                    type: "u32"
                },
                {
                    name: "N",
                    type: "u32"
                },
                {
                    name: "K",
                    type: "u32"
                }
            ];
            je(t, Q);
            let se = ()=>{
                let Y = "var a_data: ".concat(P.type.value, ";");
                for(let ee = 0; ee < h; ee++)Y += "\n              let b_data".concat(ee, " = b[(b_offset + (k + ").concat(ee, ") * uniforms.N + col) / ").concat(u, "];");
                for(let ee = 0; ee < _; ee++){
                    Y += "a_data = a[(a_offset + (row + ".concat(ee, ") * uniforms.K + k) / ").concat(h, "];");
                    for(let J = 0; J < h; J++)Y += "\n            values[".concat(ee, "] = fma(").concat(D.type.value, "(a_data").concat(h === 1 ? "" : "[".concat(J, "]"), "), b_data").concat(J, ", values[").concat(ee, "]);\n");
                }
                return Y;
            };
            return "\n  ".concat(A.registerUniforms(Q).registerInternalVariables(k).declareVariables(...j, R), "\n  ").concat(A.mainStart(), "\n    ").concat(A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n    let col = (global_idx % (uniforms.N / ").concat(u, ")) * ").concat(u, ";\n    var index1 = global_idx / (uniforms.N / ").concat(u, ");\n    let stride1 = uniforms.M / ").concat(_, ";\n    let row = (index1 % stride1) * ").concat(_, ";\n    let batch = index1 / stride1;\n\n    ").concat(r.length === 2 ? "" : "let batch_indices = ".concat(k.offsetToIndices("batch"), ";"), "\n\n    var a_indices: ").concat(P.type.indices, ";\n    ").concat(Jt("a_indices", P, P.rank - 2, k.rank, "batch_indices"), "\n    ").concat(P.indicesSet("a_indices", P.rank - 2, 0), "\n    ").concat(P.indicesSet("a_indices", P.rank - 1, 0), "\n    let a_offset = ").concat(P.indicesToOffset("a_indices"), ";\n\n    var b_indices: ").concat(D.type.indices, ";\n    ").concat(Jt("b_indices", D, D.rank - 2, k.rank, "batch_indices"), "\n    ").concat(D.indicesSet("b_indices", D.rank - 2, 0), "\n    ").concat(D.indicesSet("b_indices", D.rank - 1, 0), "\n    let b_offset = ").concat(D.indicesToOffset("b_indices"), ";\n    var values: array<").concat(R.type.value, ", ").concat(_, ">;\n    for (var k: u32 = 0u; k < uniforms.K; k = k + ").concat(h, ") {\n      ").concat(se(), "\n    }\n    for (var i = 0u; i < ").concat(_, "u; i++) {\n      var value = values[i];\n      ").concat(V, "\n      ").concat(K, "\n      let cur_indices = ").concat(R.type.indices, "(batch, row + i, col);\n      let offset = ").concat(R.indicesToOffset("cur_indices"), ";\n      ").concat(R.setByOffset("offset / ".concat(u), "value"), ";\n    }\n  }\n  ");
        };
        return {
            name: "MatMulNaive",
            shaderCache: {
                hint: "".concat(t.activation, ";").concat(u, ";").concat(h, ";").concat(_, ";").concat(o),
                inputDependencies: g ? [
                    "rank",
                    "rank",
                    "rank"
                ] : [
                    "rank",
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: i ? i(r) : r,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(y / 64)
                    },
                    programUniforms: S
                }),
            getShaderSource: T
        };
    };
});
var of, af, ho, Nu, sf, go, uf, er, Xr = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    yt();
    Qr();
    Yr();
    of = (e1, t)=>e1 ? "\n        mm_Asub[inputRow][inputCol] = mm_readA(batch,\n          kStart + inputRow,\n          globalRowStart / innerElementSize + inputCol".concat(t ? ", batchIndices" : "", ");\n        ") : "\n        mm_Asub[inputRow][inputCol] = mm_readA(batch,\n          globalRow + innerRow,\n          kStart / innerElementSize + inputCol".concat(t ? ", batchIndices" : "", ");\n        "), af = (e1, t)=>e1 ? "\n        let ACached0 = mm_Asub[k * innerElementSize][localRow];\n        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];\n        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];\n        ".concat(t === 3 ? "" : "let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];", "\n        for (var i = 0; i < rowPerThread; i = i + 1) {\n          acc[i] = BCached0 * ACached0[i] + acc[i];\n          acc[i] = BCached1 * ACached1[i] + acc[i];\n          acc[i] = BCached2 * ACached2[i] + acc[i];\n          ").concat(t === 3 ? "" : "acc[i] = BCached3 * ACached3[i] + acc[i];", "\n        }") : "\n        for (var i = 0; i < rowPerThread; i = i + 1) {\n          let ACached = mm_Asub[tileRow + i][k];\n          acc[i] = BCached0 * ACached.x + acc[i];\n          acc[i] = BCached1 * ACached.y + acc[i];\n          acc[i] = BCached2 * ACached.z + acc[i];\n          ".concat(t === 3 ? "" : "acc[i] = BCached3 * ACached.w + acc[i];", "\n        }"), ho = function(e1, t) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "f32", n = arguments.length > 3 ? arguments[3] : void 0, o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 32, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : !1, d = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 32;
        let l = t[1] * e1[1], p = t[0] * e1[0], m = o ? l : i, u = o ? i : l, h = m / t[0], _ = i / t[1];
        if (!((o && h === 4 && e1[1] === 4 || !o && (h === 3 || h === 4)) && m % t[0] === 0 && i % t[1] === 0 && e1[0] === 4)) throw new Error("If transposeA ".concat(o, " is true, innerElementSize ").concat(h, " and workPerThread[1] ").concat(e1[1], " must be 4.\n      Otherwise, innerElementSize ").concat(h, " must be 3 or 4.\n  tileAWidth ").concat(m, " must be divisible by workgroupSize[0]").concat(t[0], ". tileInner ").concat(i, " must be divisible by workgroupSize[1] ").concat(t[1], ". colPerThread ").concat(e1[0], " must be 4."));
        return "\nvar<workgroup> mm_Asub: array<array<vec".concat(h, "<").concat(r, ">, ").concat(m / h, ">, ").concat(u, ">;\nvar<workgroup> mm_Bsub: array<array<vec4<").concat(r, ">, ").concat(p / e1[0], ">, ").concat(i, ">;\n\nconst rowPerThread = ").concat(e1[1], ";\nconst colPerThread = ").concat(e1[0], ";\nconst innerElementSize = ").concat(h, ";\nconst tileInner = ").concat(i, ";\n\n@compute @workgroup_size(").concat(t[0], ", ").concat(t[1], ", ").concat(t[2], ")\nfn main(@builtin(local_invocation_id) localId : vec3<u32>,\n        @builtin(global_invocation_id) globalId : vec3<u32>,\n        @builtin(workgroup_id) workgroupId : vec3<u32>) {\n  let localRow = i32(localId.y);\n  let tileRow = localRow * rowPerThread;\n  let tileCol = i32(localId.x);\n\n  let globalRow =i32(globalId.y) * rowPerThread;\n  let globalCol = i32(globalId.x);\n  let batch = ").concat(a ? "0" : "i32(globalId.z)", ";\n  ").concat(n ? "let batchIndices = ".concat(n.offsetToIndices("u32(batch)"), ";") : "", "\n  let globalRowStart = i32(workgroupId.y) * ").concat(l, ";\n\n  let num_tiles = ").concat(a ? "".concat(Math.ceil(d / i)) : "(uniforms.dim_inner - 1) / tileInner + 1", ";\n  var kStart = ").concat(a ? "i32(globalId.z) * ".concat(d) : "0", ";\n\n  var acc: array<vec4<").concat(r, ">, rowPerThread>;\n\n  // Loop over shared dimension.\n  let tileRowB = localRow * ").concat(_, ";\n  for (var t = 0; t < num_tiles; t = t + 1) {\n      // Load one tile of A into local memory.\n      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {\n          let inputRow = tileRow + innerRow;\n          let inputCol = tileCol;\n          ").concat(of(o, n), "\n      }\n\n      // Load one tile of B into local memory.\n      for (var innerRow = 0; innerRow < ").concat(_, "; innerRow = innerRow + 1) {\n          let inputRow = tileRowB + innerRow;\n          let inputCol = tileCol;\n          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol").concat(n ? ", batchIndices" : "", ");\n      }\n      kStart = kStart + tileInner;\n      workgroupBarrier();\n\n      // Compute acc values for a single thread.\n      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {\n          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];\n          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];\n          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];\n          ").concat(h === 3 ? "" : "let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];", "\n\n          ").concat(af(o, h), "\n      }\n\n      workgroupBarrier();\n  }\n\n  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {\n      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);\n  }\n}");
    }, Nu = (e1, t)=>e1 ? "\n            mm_Asub[inputRow][inputCol] = mm_readA(batch,\n              kStart + inputRow,\n              globalRowStart + inputCol".concat(t ? ", batchIndices" : "", ");\n            ") : "\n            mm_Asub[inputRow][inputCol] = mm_readA(batch,\n              globalRowStart + inputRow,\n              kStart + inputCol".concat(t ? ", batchIndices" : "", ");\n            "), sf = (e1)=>e1 ? "let ACached = mm_Asub[k][tileRow + innerRow];" : "let ACached = mm_Asub[tileRow + innerRow][k];", go = function(e1, t) {
        let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "f32", n = arguments.length > 3 ? arguments[3] : void 0, o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 32, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : !1, d = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 32, l = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : !1;
        let p = e1[1] * t[1], m = e1[0] * t[0], u = o ? p : i, h = o ? i : p;
        if (!(h % t[1] === 0 && u % t[0] === 0 && i % t[1] === 0)) throw new Error("tileAHight ".concat(h, " must be divisible by workgroupSize[1]").concat(t[1], ", tileAWidth ").concat(u, " must be divisible by workgroupSize[0]").concat(t[0], ", tileInner ").concat(i, " must be divisible by workgroupSize[1]").concat(t[1]));
        let _ = h / t[1], y = u / t[0], g = i / t[1], x = l ? "\n    let localRow = i32(localId.y);\n    let localCol = i32(localId.x);\n    let globalRowStart = i32(workgroupId.y) * ".concat(p, ";\n    let globalColStart = i32(workgroupId.x) * ").concat(m, ";\n\n    // Loop over shared dimension.\n    for (var t = 0; t < num_tiles; t = t + 1) {\n      // Load one tile of A into local memory.\n      for (var inputRow = localRow; inputRow < ").concat(h, "; inputRow = inputRow + ").concat(t[1], ") {\n        for (var inputCol = localCol; inputCol < ").concat(u, "; inputCol = inputCol + ").concat(t[0], ") {\n          ").concat(Nu(o, n), "\n        }\n      }\n      // Load one tile of B into local memory.\n      for (var inputRow = localRow; inputRow < ").concat(i, "; inputRow = inputRow + ").concat(t[1], ") {\n            for (var inputCol = localCol; inputCol < ").concat(m, "; inputCol = inputCol + ").concat(t[0], ") {\n          mm_Bsub[inputRow][inputCol] = mm_readB(batch,\n            kStart + inputRow,\n            globalColStart + inputCol").concat(n ? ", batchIndices" : "", ");\n        }\n      }\n      kStart = kStart + tileInner;\n      workgroupBarrier();\n\n      // Compute acc values for a single thread.\n      var BCached : array<").concat(r, ", colPerThread>;\n      for (var k = 0; k < tileInner; k = k + 1) {\n        for (var inner = 0; inner < colPerThread; inner = inner + 1) {\n          BCached[inner] = mm_Bsub[k][localCol + inner * ").concat(t[0], "];\n        }\n        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {\n          let ACached = ").concat(o ? "mm_Asub[k][localRow + innerRow * ".concat(t[1], "];") : "mm_Asub[localRow + innerRow * ".concat(t[1], "][k];"), "\n          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {\n            acc[innerRow][innerCol] = acc[innerRow][innerCol] +\n                ACached * BCached[innerCol];\n          }\n        }\n      }\n      workgroupBarrier();\n    }\n    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {\n      let gRow = globalRowStart + localRow + innerRow * ").concat(t[1], ";\n      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {\n        let gCol = globalColStart + localCol + innerCol * ").concat(t[0], ";\n        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);\n      }\n    }\n    ") : "\nlet tileRow = i32(localId.y) * rowPerThread;\nlet tileCol = i32(localId.x) * colPerThread;\n\nlet globalRow = i32(globalId.y) * rowPerThread;\nlet globalCol = i32(globalId.x) * colPerThread;\nlet globalRowStart = i32(workgroupId.y) * ".concat(p, ";\n\nlet tileRowA = i32(localId.y) * ").concat(_, ";\nlet tileColA = i32(localId.x) * ").concat(y, ";\nlet tileRowB = i32(localId.y) * ").concat(g, ";\n// Loop over shared dimension.\nfor (var t = 0; t < num_tiles; t = t + 1) {\n  // Load one tile of A into local memory.\n  for (var innerRow = 0; innerRow < ").concat(_, "; innerRow = innerRow + 1) {\n    for (var innerCol = 0; innerCol < ").concat(y, "; innerCol = innerCol + 1) {\n      let inputRow = tileRowA + innerRow;\n      let inputCol = tileColA + innerCol;\n      ").concat(Nu(o, n), "\n    }\n  }\n\n  // Load one tile of B into local memory.\n  for (var innerRow = 0; innerRow < ").concat(g, "; innerRow = innerRow + 1) {\n    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {\n      let inputRow = tileRowB + innerRow;\n      let inputCol = tileCol + innerCol;\n      mm_Bsub[inputRow][inputCol] = mm_readB(batch,\n        kStart + inputRow,\n        globalCol + innerCol").concat(n ? ", batchIndices" : "", ");\n    }\n  }\n  kStart = kStart + tileInner;\n  workgroupBarrier();\n\n  // Compute acc values for a single thread.\n  var BCached : array<").concat(r, ", colPerThread>;\n  for (var k = 0; k < tileInner; k = k + 1) {\n    for (var inner = 0; inner < colPerThread; inner = inner + 1) {\n      BCached[inner] = mm_Bsub[k][tileCol + inner];\n    }\n\n    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {\n      ").concat(sf(o), "\n      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {\n        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];\n      }\n    }\n  }\n\n  workgroupBarrier();\n}\n\nfor (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {\n  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {\n    mm_write(batch, globalRow + innerRow, globalCol + innerCol,\n        acc[innerRow][innerCol]);\n  }\n}\n");
        return "\n  var<workgroup> mm_Asub : array<array<".concat(r, ", ").concat(u, ">, ").concat(h, ">;\n  var<workgroup> mm_Bsub : array<array<").concat(r, ", ").concat(m, ">, ").concat(i, ">;\n  const rowPerThread = ").concat(e1[1], ";\n  const colPerThread = ").concat(e1[0], ";\n  const tileInner = ").concat(i, ";\n\n@compute @workgroup_size(").concat(t[0], ", ").concat(t[1], ", ").concat(t[2], ")\nfn main(@builtin(local_invocation_id) localId : vec3<u32>,\n        @builtin(global_invocation_id) globalId : vec3<u32>,\n        @builtin(workgroup_id) workgroupId : vec3<u32>) {\n    let batch = ").concat(a ? "0" : "i32(globalId.z)", ";\n    ").concat(n ? "let batchIndices = ".concat(n.offsetToIndices("u32(batch)"), ";") : "", "\n    let num_tiles = ").concat(a ? "".concat(Math.ceil(d / i)) : "(uniforms.dim_inner - 1) / tileInner + 1", ";\n    var kStart = ").concat(a ? "i32(globalId.z) * ".concat(d) : "0", ";\n\n    var acc : array<array<").concat(r, ", colPerThread>, rowPerThread>;\n    ").concat(x, "\n  }\n");
    }, uf = function(e1, t, r, n) {
        let o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
        let [i, a, d, l] = n, p = _e(n[0].type.tensor);
        return "\n    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ".concat(i.type.indices, ") -> ").concat(Ae(e1, p), " {\n      var value = ").concat(Ae(e1, p), "(0.0);\n      let col = colIn * ").concat(e1, ";\n      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)\n      {\n        var aIndices: ").concat(a.type.indices, ";\n        ").concat(Jt("aIndices", a, a.rank - 2, i.rank, "batchIndices"), "\n        ").concat(a.indicesSet("aIndices", a.rank - 2, "u32(row)"), "\n        ").concat(a.indicesSet("aIndices", a.rank - 1, "u32(colIn)"), "\n        value = ").concat(a.getByIndices("aIndices"), ";\n      }\n      return value;\n    }\n\n    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ").concat(i.type.indices, ") -> ").concat(Ae(e1, p), " {\n      var value = ").concat(Ae(e1, p), "(0.0);\n      let col = colIn * ").concat(e1, ";\n      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)\n      {\n        var bIndices: ").concat(d.type.indices, ";\n        ").concat(Jt("bIndices", d, d.rank - 2, i.rank, "batchIndices"), "\n        ").concat(d.indicesSet("bIndices", d.rank - 2, "u32(row)"), "\n        ").concat(d.indicesSet("bIndices", d.rank - 1, "u32(colIn)"), "\n        value = ").concat(d.getByIndices("bIndices"), ";\n      }\n      return value;\n    }\n\n    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ").concat(Ae(e1, p), ") {\n      let col = colIn * ").concat(e1, ";\n      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {\n        var value = valueIn;\n        let coords = vec3<i32>(batch, row, colIn);\n        ").concat(t ? "value = value + ".concat(o ? "bias[colIn]" : "".concat(Ae(e1, p), "(bias[row])"), ";") : "", "\n        ").concat(r, "\n        ").concat(l.setByIndices("vec3<u32>(coords)", "value"), "\n      }\n    }\n    ");
    }, er = function(e1, t, r, n) {
        let o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, i = arguments.length > 5 ? arguments[5] : void 0;
        let a = e1[0].dims, d = e1[1].dims, l = a.slice(0, -2), p = d.slice(0, -2), m = n ? n.slice(0, -2) : r.slice(0, -2), u = C.size(m), h = a[a.length - 2], _ = a[a.length - 1], y = d[d.length - 1], g = _ % 4 === 0 && y % 4 === 0, x = h <= 8 ? [
            4,
            1,
            1
        ] : [
            4,
            4,
            1
        ], $ = [
            8,
            8,
            1
        ], v = [
            Math.ceil(y / $[0] / x[0]),
            Math.ceil(h / $[1] / x[1]),
            Math.ceil(u / $[2] / x[2])
        ], S = g ? 4 : 1, T = [
            ...l,
            h,
            _ / S
        ], A = T.length, k = [
            ...p,
            _,
            y / S
        ], P = k.length, D = [
            u,
            h,
            y / S
        ], R = [
            {
                type: 6,
                data: h
            },
            {
                type: 6,
                data: y
            },
            {
                type: 6,
                data: _
            }
        ];
        Ke(t, R), R.push(...N(m, T, k));
        let G = [
            "rank",
            "rank"
        ], K = e1.length > 2;
        K && (R.push(...N(e1[2].dims)), G.push("rank")), R.push(...N(D));
        let j = (V)=>{
            let Q = m.length, se = Lr("batchDims", e1[0].dataType, Q, 1), Y = _e(e1[0].dataType), ee = E("a", e1[0].dataType, A, S), J = E("b", e1[1].dataType, P, S), ne = M("result", e1[0].dataType, D.length, S), be = [
                ee,
                J
            ];
            if (K) {
                let q = o ? S : 1;
                be.push(E("bias", e1[2].dataType, e1[2].dims.length, q));
            }
            let Oe = [
                {
                    name: "dim_a_outer",
                    type: "i32"
                },
                {
                    name: "dim_b_outer",
                    type: "i32"
                },
                {
                    name: "dim_inner",
                    type: "i32"
                }
            ];
            je(t, Oe);
            let $e = _e(ne.type.tensor), le = qe(t, ne.type.value, $e), W = uf(S, K, le, [
                se,
                ee,
                J,
                ne
            ], o);
            return "\n  ".concat(V.registerUniforms(Oe).registerInternalVariables(se).declareVariables(...be, ne), "\n  ").concat(W, "\n  ").concat(g ? ho(x, $, Y, se) : go(x, $, Y, se), "\n                   ");
        };
        return {
            name: "MatMul",
            shaderCache: {
                hint: "".concat(x, ";").concat(t.activation, ";").concat(g, ";").concat(o),
                inputDependencies: G
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: i ? i(r) : r,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: v[0],
                        y: v[1],
                        z: v[2]
                    },
                    programUniforms: R
                }),
            getShaderSource: j
        };
    };
});
var df, Vu, Wu = U(()=>{
    "use strict";
    te();
    et();
    ae();
    yt();
    Yr();
    Uu();
    Xr();
    df = function(e1, t, r, n) {
        let o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, i = arguments.length > 5 ? arguments[5] : void 0, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 4, d = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 4, l = arguments.length > 8 && arguments[8] !== void 0 ? arguments[8] : 4, p = arguments.length > 9 && arguments[9] !== void 0 ? arguments[9] : "f32";
        let m = (G)=>{
            switch(G){
                case 1:
                    return "resData = x[xIndex];";
                case 3:
                    return "resData = vec3<".concat(p, ">(x[xIndex], x[xIndex + 1], x[xIndex + 2]);");
                case 4:
                    return "resData = x[xIndex / 4];";
                default:
                    throw new Error("innerElementSize ".concat(G, " is not supported."));
            }
        }, u = (G)=>{
            switch(G){
                case 1:
                    return "return w[row * i32(uniforms.w_shape[3]) + colIn];";
                case 4:
                    return "return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";
                default:
                    throw new Error("innerElementSize ".concat(G, " is not supported."));
            }
        }, h = e1 ? "\n    let coord = vec4<i32>(batch, xRow, xCol, xCh);\n    " : "\n    let coord = vec4<i32>(batch, xCh, xRow, xCol);\n    ", _ = e1 ? "\n    let coords = vec4<i32>(\n      batch,\n      row / outWidth,\n      row % outWidth,\n      col);\n    " : "\n    let coords = vec4<i32>(\n      batch,\n      row,\n      col / outWidth,\n      col % outWidth);\n    ", y = e1 ? "i32(uniforms.x_shape[1])" : "i32(uniforms.x_shape[2])", g = e1 ? "i32(uniforms.x_shape[2])" : "i32(uniforms.x_shape[3])", x = e1 ? "row" : "col", $ = e1 ? "col" : "row", v = "\n    let inChannels = i32(uniforms.w_shape[2]);\n    let outWidth = ".concat(e1 ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])", ";\n    let outRow = ").concat(x, " / outWidth;\n    let outCol = ").concat(x, " % outWidth;\n\n    let WRow = ").concat($, " / (i32(uniforms.w_shape[1]) * inChannels);\n    let WCol = ").concat($, " / inChannels % i32(uniforms.w_shape[1]);\n    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];\n    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];\n    let xCh = ").concat($, " % inChannels;\n    var resData = ").concat(Ae(a, p), "(0.0);\n    // The bounds checking is always needed since we use it to pad zero for\n    // the 'same' padding type.\n    if (xRow >= 0 && xRow < ").concat(y, " && xCol >= 0 && xCol < ").concat(g, ") {\n      ").concat(h, "\n      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));\n      ").concat(m(a), "\n    }\n    return resData;"), S = e1 ? t && n ? "\n    let col = colIn * ".concat(a, ";\n    ").concat(v) : "\n    let col = colIn * ".concat(a, ";\n    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {\n      ").concat(v, "\n    }\n    return ").concat(Ae(a, p), "(0.0);") : n && r ? "\n    let col = colIn * ".concat(a, ";\n    ").concat(v) : "\n    let col = colIn * ".concat(a, ";\n    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {\n      ").concat(v, "\n    }\n    return ").concat(Ae(a, p), "(0.0);"), T = e1 ? n && r ? u(d) : "\n    let col = colIn * ".concat(d, ";\n    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {\n      ").concat(u(d), "\n    }\n    return ").concat(Ae(d, p), "(0.0);") : "\n    let col = colIn * ".concat(d, ";\n    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {\n      ").concat(u(d), "\n    }\n    return ").concat(Ae(d, p), "(0.0);"), A = Ae(l, p), k = e1 ? Ae(a, p) : Ae(d, p), P = e1 ? Ae(d, p) : Ae(a, p), D = qe(i, A, p);
        return "\n    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ".concat(k, " {\n      ").concat(e1 ? S : T, "\n    }\n\n    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ").concat(P, " {\n      ").concat(e1 ? T : S, "\n    }\n\n    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ").concat(A, ") {\n      let col = colIn * ").concat(l, ";\n      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)\n      {\n      var value = valueIn;\n      let outWidth = ").concat(e1 ? "i32(uniforms.result_shape[2])" : "i32(uniforms.result_shape[3])", ";\n      ").concat(_, "\n      ").concat(Mu(o), "\n      ").concat(D, "\n      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);\n      }\n    }");
    }, Vu = (e1, t, r, n, o, i, a, d, l)=>{
        let p = t.format === "NHWC", m = p ? e1[0].dims[3] : e1[0].dims[1], u = r[0], h = p ? r[2] : r[3], _ = p ? r[1] : r[2], y = p ? r[3] : r[1], g = p && (m % 4 === 0 || m % 3 === 0) && y % 4 === 0, x = p ? y : h * _, $ = p ? h * _ : y, v = [
            8,
            8,
            1
        ], S = n <= 8 ? [
            4,
            1,
            1
        ] : [
            4,
            4,
            1
        ], T = [
            Math.ceil(x / v[0] / S[0]),
            Math.ceil($ / v[1] / S[1]),
            Math.ceil(u / v[2] / S[2])
        ];
        ue("verbose", ()=>"[conv2d_mm_webgpu] dispatch = ".concat(T));
        let A = g ? p && m % 4 !== 0 ? 3 : 4 : 1, k = v[1] * S[1], P = v[0] * S[0], D = Math.max(v[0] * A, v[1]), R = n % k === 0, G = o % P === 0, K = i % D === 0, j = g ? [
            A,
            4,
            4
        ] : [
            1,
            1,
            1
        ], V = [
            {
                type: 6,
                data: n
            },
            {
                type: 6,
                data: o
            },
            {
                type: 6,
                data: i
            },
            {
                type: 6,
                data: [
                    t.pads[0],
                    t.pads[1]
                ]
            },
            {
                type: 6,
                data: t.strides
            },
            {
                type: 6,
                data: t.dilations
            }
        ];
        Ke(t, V), V.push(...N(e1[0].dims, e1[1].dims));
        let Q = [
            "rank",
            "rank"
        ];
        a && (V.push(...N(e1[2].dims)), Q.push("rank")), V.push(...N(r));
        let se = (Y)=>{
            let ee = [
                {
                    name: "dim_a_outer",
                    type: "i32"
                },
                {
                    name: "dim_b_outer",
                    type: "i32"
                },
                {
                    name: "dim_inner",
                    type: "i32"
                },
                {
                    name: "pad",
                    type: "i32",
                    length: 2
                },
                {
                    name: "stride",
                    type: "i32",
                    length: 2
                },
                {
                    name: "dilation",
                    type: "i32",
                    length: 2
                }
            ];
            je(t, ee);
            let J = g ? 4 : 1, ne = _e(e1[0].dataType), be = "\n      fn setOutputAtIndex(flatIndex : i32, value : ".concat(g ? "vec4<".concat(ne, ">") : ne, ") {\n        result[flatIndex] = ").concat(g ? "vec4<".concat(ne, ">") : ne, "(value);\n      }\n      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ").concat(g ? "vec4<".concat(ne, ">") : ne, ") {\n        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));\n        setOutputAtIndex(flatIndex ").concat(g ? "/ 4" : "", ", value);\n      }"), Oe = E("x", e1[0].dataType, e1[0].dims.length, A === 3 ? 1 : A), $e = E("w", e1[1].dataType, e1[1].dims.length, J), le = [
                Oe,
                $e
            ], W = M("result", e1[0].dataType, r.length, J);
            if (a) {
                let q = E("bias", e1[2].dataType, e1[2].dims.length, J);
                le.push(q), be += "\n        fn getBiasByOutputCoords(coords : vec4<i32>) -> ".concat(g ? "vec4<".concat(ne, ">") : ne, " {\n          return bias[coords.").concat(p ? "w" : "y").concat(g ? "/ 4" : "", "];\n        }");
            }
            return "\n        ".concat(Ru("uniforms.result_strides"), "\n        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,\n        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,\n        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };\n        ").concat(Y.registerUniforms(ee).declareVariables(...le, W), "\n        ").concat(be, "\n        ").concat(df(p, R, G, K, a, t, j[0], j[1], j[2], ne), "\n        ").concat(g ? ho(S, v, ne, void 0, !p, D) : go(S, v, ne, void 0, !p, D, !1, void 0, d));
        };
        return {
            name: "Conv2DMatMul",
            shaderCache: {
                hint: "".concat(t.cacheKey, ";").concat(A, ";").concat(g, ";").concat(R, ";").concat(G, ";").concat(K, ";").concat(k, ";").concat(P, ";").concat(D),
                inputDependencies: Q
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: l ? l(r) : r,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: T[0],
                        y: T[1],
                        z: T[2]
                    },
                    programUniforms: V
                }),
            getShaderSource: se
        };
    };
});
var lf, Lu, Jr, cf, Gu, pf, Hu, Fu, qu = U(()=>{
    "use strict";
    te();
    et();
    oe();
    ae();
    yt();
    Yr();
    lf = (e1)=>{
        let t = 1;
        for(let r = 0; r < e1.length; r++)t *= e1[r];
        return t;
    }, Lu = (e1)=>typeof e1 == "number" ? [
            e1,
            e1,
            e1
        ] : e1, Jr = (e1, t)=>t <= 1 ? e1 : e1 + (e1 - 1) * (t - 1), cf = function(e1, t, r) {
        let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
        let o = Jr(t, n);
        return Math.floor((e1[0] * (r - 1) - r + o) / 2);
    }, Gu = (e1, t, r, n, o)=>{
        o == null && (o = cf(e1, t[0], n[0]));
        let i = [
            0,
            0,
            0,
            r
        ];
        for(let a = 0; a < 3; a++)e1[a] + 2 * o >= t[a] && (i[a] = Math.trunc((e1[a] - t[a] + 2 * o) / n[a] + 1));
        return i;
    }, pf = (e1, t, r, n, o, i, a, d, l, p)=>{
        let m, u, h, _;
        if (e1 === "VALID" && (e1 = 0), typeof e1 == "number") {
            m = {
                top: e1,
                bottom: e1,
                left: e1,
                right: e1,
                front: e1,
                back: e1
            };
            let y = Gu([
                t,
                r,
                n,
                1
            ], [
                d,
                l,
                p
            ], 1, [
                o,
                i,
                a
            ], e1);
            u = y[0], h = y[1], _ = y[2];
        } else if (Array.isArray(e1)) {
            if (!e1.every((g, x, $)=>g === $[0])) throw Error("Unsupported padding parameter: ".concat(e1));
            m = {
                top: e1[0],
                bottom: e1[1],
                left: e1[2],
                right: e1[3],
                front: e1[4],
                back: e1[5]
            };
            let y = Gu([
                t,
                r,
                n,
                1
            ], [
                d,
                l,
                p
            ], 1, [
                o,
                i,
                a
            ], e1[0]);
            u = y[0], h = y[1], _ = y[2];
        } else if (e1 === "SAME_UPPER") {
            u = Math.ceil(t / o), h = Math.ceil(r / i), _ = Math.ceil(n / a);
            let y = (u - 1) * o + d - t, g = (h - 1) * i + l - r, x = (_ - 1) * a + p - n, $ = Math.floor(y / 2), v = y - $, S = Math.floor(g / 2), T = g - S, A = Math.floor(x / 2), k = x - A;
            m = {
                top: S,
                bottom: T,
                left: A,
                right: k,
                front: $,
                back: v
            };
        } else throw Error("Unknown padding parameter: ".concat(e1));
        return {
            padInfo: m,
            outDepth: u,
            outHeight: h,
            outWidth: _
        };
    }, Hu = function(e1, t, r, n, o) {
        let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !1, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : "channelsLast";
        let d, l, p, m, u;
        if (a === "channelsLast") [d, l, p, m, u] = e1;
        else if (a === "channelsFirst") [d, u, l, p, m] = e1;
        else throw new Error("Unknown dataFormat ".concat(a));
        let [h, , _, y, g] = t, [x, $, v] = Lu(r), [S, T, A] = Lu(n), k = Jr(_, S), P = Jr(y, T), D = Jr(g, A), { padInfo: R, outDepth: G, outHeight: K, outWidth: j } = pf(o, l, p, m, x, $, v, k, P, D), V = i ? h * u : h, Q = [
            0,
            0,
            0,
            0,
            0
        ];
        return a === "channelsFirst" ? Q = [
            d,
            V,
            G,
            K,
            j
        ] : a === "channelsLast" && (Q = [
            d,
            G,
            K,
            j,
            V
        ]), {
            batchSize: d,
            dataFormat: a,
            inDepth: l,
            inHeight: p,
            inWidth: m,
            inChannels: u,
            outDepth: G,
            outHeight: K,
            outWidth: j,
            outChannels: V,
            padInfo: R,
            strideDepth: x,
            strideHeight: $,
            strideWidth: v,
            filterDepth: _,
            filterHeight: y,
            filterWidth: g,
            effectiveFilterDepth: k,
            effectiveFilterHeight: P,
            effectiveFilterWidth: D,
            dilationDepth: S,
            dilationHeight: T,
            dilationWidth: A,
            inShape: e1,
            outShape: Q,
            filterShape: t
        };
    }, Fu = (e1, t, r, n, o, i)=>{
        let a = i === "channelsLast", d = a ? e1[0].dims[3] : e1[0].dims[1], l = !1, p = [
            64,
            1,
            1
        ], m = {
            x: r.map((v, S)=>S)
        }, u = [
            Math.ceil(lf(m.x.map((v)=>r[v])) / p[0]),
            1,
            1
        ];
        ue("verbose", ()=>"[conv3d_naive_webgpu] dispatch = ".concat(u));
        let h = l ? a && d % 4 !== 0 ? 3 : 4 : 1, _ = C.size(r), y = [
            {
                type: 12,
                data: _
            },
            {
                type: 12,
                data: n
            },
            {
                type: 12,
                data: o
            },
            {
                type: 12,
                data: t.strides
            },
            {
                type: 12,
                data: t.dilations
            }
        ];
        Ke(t, y), y.push(...N(e1[0].dims, e1[1].dims));
        let g = [
            "rank",
            "rank"
        ], x = e1.length === 3;
        x && (y.push(...N(e1[2].dims)), g.push("rank")), y.push(...N(r));
        let $ = (v)=>{
            let S = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "filter_dims",
                    type: "u32",
                    length: n.length
                },
                {
                    name: "pads",
                    type: "u32",
                    length: o.length
                },
                {
                    name: "strides",
                    type: "u32",
                    length: t.strides.length
                },
                {
                    name: "dilations",
                    type: "u32",
                    length: t.dilations.length
                }
            ];
            je(t, S);
            let T = l ? 4 : 1, A = _e(e1[0].dataType), k = E("x", e1[0].dataType, e1[0].dims.length, h === 3 ? 1 : h), P = E("W", e1[1].dataType, e1[1].dims.length, T), D = [
                k,
                P
            ], R = M("result", e1[0].dataType, r.length, T), G = "";
            if (x) {
                let V = E("bias", e1[2].dataType, e1[2].dims.length, T);
                D.push(V), G += "\n        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ".concat(l ? "vec4<".concat(A, ">") : A, " {\n          return bias[").concat(a ? F("coords", 4, 5) : F("coords", 1, 5)).concat(l ? "/ 4" : "", "];\n        }");
            }
            let K = Ae(h, A), j = qe(t, K, A);
            return "\n            ".concat(G, "\n            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {\n              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);\n              return ").concat(k.getByIndices("aIndices"), ";\n            }\n            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {\n              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);\n              return ").concat(P.getByIndices("aIndices"), ";\n            }\n          ").concat(v.registerUniforms(S).declareVariables(...D, R), "\n          ").concat(v.mainStart(), "\n          ").concat(v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n              let coords = ").concat(R.offsetToIndices("global_idx"), ";\n              let batch = ").concat(F("coords", 0, k.rank), ";\n              let d2 = ").concat(a ? F("coords", k.rank - 1, k.rank) : F("coords", 1, k.rank), ";\n              let xFRCCorner = vec3<u32>(").concat(a ? F("coords", 1, k.rank) : F("coords", 2, k.rank), ",\n              ").concat(a ? F("coords", 2, k.rank) : F("coords", 3, k.rank), ",\n              ").concat(a ? F("coords", 3, k.rank) : F("coords", 4, k.rank), ") * uniforms.strides - uniforms.pads;\n              let xFCorner = xFRCCorner.x;\n              let xRCorner = xFRCCorner.y;\n              let xCCorner = xFRCCorner.z;\n              let xShapeY = ").concat(a ? F("uniforms.x_shape", 1, k.rank) : F("uniforms.x_shape", 2, k.rank), ";\n              let xShapeZ = ").concat(a ? F("uniforms.x_shape", 2, k.rank) : F("uniforms.x_shape", 3, k.rank), ";\n              let xShapeW = ").concat(a ? F("uniforms.x_shape", 3, k.rank) : F("uniforms.x_shape", 4, k.rank), ";\n              let xShapeU = ").concat(a ? F("uniforms.x_shape", 4, k.rank) : F("uniforms.x_shape", 1, k.rank), ";\n              let inputDepthNearestVec4 = (xShapeU / 4) * 4;\n              let inputDepthVec4Remainder = xShapeU % 4;\n\n              var value = 0.0;\n              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {\n                let xF = xFCorner + wF * uniforms.dilations[0];\n                if (xF < 0 || xF >= xShapeY) {\n                  continue;\n                }\n\n                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {\n                  let xR = xRCorner + wR * uniforms.dilations[1];\n                  if (xR < 0 || xR >= xShapeZ) {\n                    continue;\n                  }\n\n                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {\n                    let xC = xCCorner + wC * uniforms.dilations[2];\n                    if (xC < 0 || xC >= xShapeW) {\n                      continue;\n                    }\n\n                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {\n                      ").concat(a ? "let xValues = vec4<f32>(\n                               getX(batch, xF, xR, xC, d1),\n                               getX(batch, xF, xR, xC, d1 + 1),\n                               getX(batch, xF, xR, xC, d1 + 2),\n                               getX(batch, xF, xR, xC, d1 + 3));\n                            " : "let xValues = vec4<f32>(\n                               getX(batch, d1, xF, xR, xC),\n                               getX(batch, d1 + 1, xF, xR, xC),\n                               getX(batch, d1 + 2, xF, xR, xC),\n                               getX(batch, d1 + 3, xF, xR, xC));\n                            ", "\n                            let wValues = vec4<f32>(\n                              getW(d2, d1, wF, wR, wC),\n                              getW(d2, d1 + 1, wF, wR, wC),\n                              getW(d2, d1 + 2, wF, wR, wC),\n                              getW(d2, d1 + 3, wF, wR, wC));\n                      value += dot(xValues, wValues);\n                    }\n                    if (inputDepthVec4Remainder == 1) {\n                        ").concat(a ? "value += getX(batch, xF, xR, xC, inputDepthNearestVec4)\n                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);" : "value += getX(batch, inputDepthNearestVec4, xF, xR, xC)\n                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);", "\n                    } else if (inputDepthVec4Remainder == 2) {\n                      ").concat(a ? "let xValues = vec2<f32>(\n                        getX(batch, xF, xR, xC, inputDepthNearestVec4),\n                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));\n                      " : "let xValues = vec2<f32>(\n                        getX(batch, inputDepthNearestVec4, xF, xR, xC),\n                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));\n                    ", "\n                    let wValues = vec2<f32>(\n                      getW(d2, inputDepthNearestVec4, wF, wR, wC),\n                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));\n                      value += dot(xValues, wValues);\n                    } else if (inputDepthVec4Remainder == 3) {\n                      ").concat(a ? "let xValues = vec3<f32>(\n                        getX(batch, xF, xR, xC, inputDepthNearestVec4),\n                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),\n                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));\n                      " : "let xValues = vec3<f32>(\n                        getX(batch, inputDepthNearestVec4, xF, xR, xC),\n                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),\n                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));\n                    ", "\n                    let wValues = vec3<f32>(\n                      getW(d2, inputDepthNearestVec4, wF, wR, wC),\n                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),\n                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));\n                      value += dot(xValues, wValues);\n                    }\n                  }\n                }\n              }\n              ").concat(x ? "value = value + getBiasByOutputCoords(coords)" : "", ";\n              ").concat(j, "\n              result[global_idx] = f32(value);\n          }");
        };
        return {
            name: "Conv3DNaive",
            shaderCache: {
                hint: "".concat(t.cacheKey, ";").concat(a, ";").concat(h, ";").concat(x),
                inputDependencies: g
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: r,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: u[0],
                        y: u[1],
                        z: u[2]
                    },
                    programUniforms: y
                }),
            getShaderSource: $
        };
    };
});
var Ku, ju, Yu = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    yt();
    Ku = (e1, t, r, n)=>{
        let o = e1.length > 2, i = o ? "value += b[output_channel];" : "", a = e1[0].dims, d = e1[1].dims, l = t.format === "NHWC", p = l ? r[3] : r[1], m = p / t.group, u = l && m >= 4 ? me(p) : 1, h = C.size(r) / u, _ = [
            {
                type: 12,
                data: h
            },
            {
                type: 12,
                data: t.dilations
            },
            {
                type: 12,
                data: [
                    t.strides[0],
                    t.strides[1]
                ]
            },
            {
                type: 12,
                data: [
                    t.pads[0],
                    t.pads[1]
                ]
            },
            {
                type: 12,
                data: m
            }
        ];
        Ke(t, _), _.push(...N(a, [
            d[0],
            d[1],
            d[2],
            d[3] / u
        ]));
        let y = o ? [
            "rank",
            "rank",
            "rank"
        ] : [
            "rank",
            "rank"
        ];
        _.push(...N([
            r[0],
            r[1],
            r[2],
            r[3] / u
        ]));
        let g = (x)=>{
            let $ = M("output", e1[0].dataType, r.length, u), v = _e($.type.tensor), S = qe(t, $.type.value, v), T = E("x", e1[0].dataType, a.length), A = E("w", e1[1].dataType, d.length, u), k = [
                T,
                A
            ];
            o && k.push(E("b", e1[2].dataType, e1[2].dims, u));
            let P = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "dilations",
                    type: "u32",
                    length: t.dilations.length
                },
                {
                    name: "strides",
                    type: "u32",
                    length: 2
                },
                {
                    name: "pads",
                    type: "u32",
                    length: 2
                },
                {
                    name: "output_channels_per_group",
                    type: "u32"
                }
            ];
            je(t, P);
            let D = l ? "\n      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {\n        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];\n\n        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {\n          continue;\n        }\n\n        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {\n          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];\n          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {\n            continue;\n          }\n\n          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {\n            let input_channel = in_channel_offset + wInChannel;\n            let xVal = ".concat(T.get("batch", "xHeight", "xWidth", "input_channel"), ";\n            let wVal = ").concat(A.get("wHeight", "wWidth", "wInChannel", "output_channel"), ";\n            value += xVal * wVal;\n          }\n        }\n      }\n      ") : "\n      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {\n        let input_channel = in_channel_offset + wInChannel;\n        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {\n          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];\n\n          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {\n            continue;\n          }\n\n          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {\n            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];\n            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {\n              continue;\n            }\n\n            let xVal = ".concat(T.get("batch", "input_channel", "xHeight", "xWidth"), ";\n            let wVal = ").concat(A.get("output_channel", "wInChannel", "wHeight", "wWidth"), ";\n            value += xVal * wVal;\n          }\n        }\n      }\n      ");
            return "\n  ".concat(x.registerUniforms(P).declareVariables(...k, $), "\n\n  ").concat(x.mainStart(), "\n    ").concat(x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n\n    let outputIndices = ").concat($.offsetToIndices("global_idx"), ";\n    let batch: u32 = outputIndices[0];\n    let output_channel: u32 = outputIndices[").concat(l ? 3 : 1, "];\n    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[").concat(l ? 1 : 2, "], outputIndices[").concat(l ? 2 : 3, "]) * uniforms.strides - uniforms.pads;\n    let group_id: u32 = output_channel * ").concat(u, " / uniforms.output_channels_per_group;\n    var in_channel_offset = group_id * uniforms.w_shape[").concat(l ? 2 : 1, "];\n\n    var value: ").concat($.type.value, " = ").concat($.type.value, "(0);\n    ").concat(D, "\n    ").concat(i, "\n    ").concat(S, "\n    ").concat($.setByOffset("global_idx", "value"), "\n  }");
        };
        return {
            name: "GroupedConv",
            shaderCache: {
                hint: "".concat(t.cacheKey, "_").concat(u),
                inputDependencies: y
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: n ? n(r) : r,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(h / 64)
                    },
                    programUniforms: _
                }),
            getShaderSource: g
        };
    }, ju = (e1, t, r, n)=>{
        let o = e1.length > 2, i = me(r[3]), a = me(r[2]), d = C.size(r) / i / a, l = [
            e1[0].dims[0],
            e1[0].dims[1],
            e1[0].dims[2],
            e1[0].dims[3] / i
        ], p = [
            e1[1].dims[0],
            e1[1].dims[1],
            e1[1].dims[2],
            e1[1].dims[3] / i
        ], m = [
            r[0],
            r[1],
            r[2],
            r[3] / i
        ], u = [
            {
                type: 12,
                data: d
            },
            {
                type: 6,
                data: [
                    t.strides[0],
                    t.strides[1]
                ]
            },
            {
                type: 6,
                data: [
                    t.pads[0],
                    t.pads[1]
                ]
            }
        ];
        Ke(t, u), u.push(...N(l, p, m));
        let h = (a - 1) * t.strides[1] + p[1], _ = (y)=>{
            let g = M("output", e1[0].dataType, m.length, i), x = _e(g.type.tensor), $ = qe(t, g.type.value, x), v = E("x", e1[0].dataType, l.length, i), S = E("w", e1[1].dataType, p.length, i), T = [
                v,
                S
            ];
            o && T.push(E("b", e1[2].dataType, e1[2].dims, i));
            let A = o ? "value += b[output_channel];" : "", k = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "strides",
                    type: "i32",
                    length: 2
                },
                {
                    name: "pads",
                    type: "i32",
                    length: 2
                }
            ];
            return je(t, k), "\n  ".concat(y.registerUniforms(k).declareVariables(...T, g), "\n  ").concat(y.mainStart(), "\n    ").concat(y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n    let width0 = uniforms.output_shape[3];\n    let output_channel = global_idx % width0;\n    var index1 = global_idx / width0;\n    let width1 = uniforms.output_shape[2] / ").concat(a, "u;\n    let col = (index1 % width1) * ").concat(a, "u;\n    index1 = index1 / width1;\n    let row = index1 % uniforms.output_shape[1];\n    let batch = index1 / uniforms.output_shape[1];\n\n    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;\n\n    var x_vals: array<").concat(v.type.value, ", ").concat(h, ">;\n    var values: array<").concat(g.type.value, ", ").concat(a, ">;\n    let input_channel = output_channel;\n    // Use constant instead of uniform can give better performance for w's height/width.\n    for (var w_height: u32 = 0u; w_height < ").concat(p[0], "; w_height++) {\n      let x_height = x_corner.x + i32(w_height);\n      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {\n        for (var i = 0; i < ").concat(h, "; i++) {\n          let x_width = x_corner.y + i;\n          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {\n            x_vals[i] = ").concat(v.get("batch", "u32(x_height)", "u32(x_width)", "input_channel"), ";\n          } else {\n            x_vals[i] = ").concat(v.type.value, "(0);\n          }\n        }\n        for (var w_width: u32 = 0u; w_width < ").concat(p[1], "; w_width++) {\n          let w_val = ").concat(S.get("w_height", "w_width", "0", "output_channel"), ";\n          for (var i = 0u; i < ").concat(a, "u; i++) {\n            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);\n          }\n        }\n      }\n    }\n\n    for (var i = 0u; i < ").concat(a, "u; i++) {\n      var value = values[i];\n      ").concat(A, "\n      ").concat($, "\n      ").concat(g.set("batch", "row", "col + i", "output_channel", "value"), ";\n    }\n  }");
        };
        return {
            name: "GroupedConv-Vectorize",
            shaderCache: {
                hint: "".concat(t.cacheKey, ";").concat(i, ";").concat(a, ";").concat(h, ";").concat(p[0], ";").concat(p[1]),
                inputDependencies: o ? [
                    "rank",
                    "rank",
                    "type"
                ] : [
                    "rank",
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: n ? n(r) : r,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(d / 64)
                    },
                    programUniforms: u
                }),
            getShaderSource: _
        };
    };
});
var mf, bo, ff, yo, _o, Zu, hf, gf, wo, Qu = U(()=>{
    "use strict";
    oe();
    Wu();
    qu();
    Xr();
    Yu();
    yt();
    Qr();
    dt();
    mf = (e1, t, r, n, o, i)=>{
        let a = e1[0], d = e1.slice(i ? 1 : 2, i ? 3 : 4), l = d.length, p = t[0], u = t.slice(2).map((y, g)=>y + (y - 1) * (r[g] - 1)), _ = d.map((y, g)=>y + n[g] + n[g + l]).map((y, g)=>Math.floor((y - u[g] + o[g]) / o[g]));
        return _.splice(0, 0, a), _.splice(i ? 3 : 1, 0, p), _;
    }, bo = [
        2,
        3,
        1,
        0
    ], ff = (e1, t)=>{
        if (!e1 || e1.length !== 2 && e1.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
        if (e1[0].dims.length > 5) throw new Error("greater than 5D is not supported");
        if (e1[0].dims.length !== e1[1].dims.length) throw new Error("filter does not have same dimension as input");
        let r = e1[0].dims[t.format === "NHWC" ? e1[0].dims.length - 1 : 1], n = e1[1].dims[1] * t.group;
        if (r !== n) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
        if (e1.length === 3 && (e1[2].dims.length !== 1 || e1[1].dims[0] !== e1[2].dims[0])) throw new Error("invalid bias");
        let o = e1[0].dims.length - 2;
        if (t.dilations.length !== o) throw new Error("dilations should be ".concat(o, "D"));
        if (t.strides.length !== o) throw new Error("strides should be ".concat(o, "D"));
        if (t.pads.length !== o * 2) throw new Error("pads should be ".concat(o * 2, "D"));
        if (t.kernelShape.length !== 0 && t.kernelShape.length !== e1[1].dims.length - 2) throw new Error("invalid kernel shape");
    }, yo = (e1, t)=>{
        let r = e1.kernelShape.slice();
        r.length < t[1].dims.length - 2 && r.push(...Array(t[1].dims.length - 2 - r.length).fill(0));
        for(let i = 2; i < t[1].dims.length; ++i)r[i - 2] === 0 && (r[i - 2] = t[1].dims[i]);
        let n = e1.pads.slice();
        At.adjustPadsBasedOnAutoPad(t[0].dims, e1.strides, e1.dilations, r, n, e1.format === "NHWC", e1.autoPad);
        let o = Object.assign({}, e1);
        return Object.assign(o, {
            kernelShape: r,
            pads: n
        }), o;
    }, _o = (e1)=>{
        let t = jr(e1), r = e1.format, n = [
            "NOTSET",
            "VALID",
            "SAME_UPPER",
            "SAME_LOWER"
        ][e1.auto_pad], o = e1.dilations, i = e1.group, a = e1.kernel_shape, d = e1.pads, l = e1.strides, p = e1.w_is_const();
        return {
            autoPad: n,
            format: r,
            dilations: o,
            group: i,
            kernelShape: a,
            pads: d,
            strides: l,
            wIsConst: p,
            ...t,
            cacheKey: "".concat(e1.format, ";").concat(t.activation, ";")
        };
    }, Zu = (e1, t, r, n)=>{
        let o = r.format === "NHWC", i = mf(t[0].dims, t[1].dims, r.dilations, r.pads, r.strides, o);
        if (r.group !== 1) {
            let k = [
                t[0]
            ];
            if (o) {
                var _e_kernelCustomData_wT;
                let D = (_e_kernelCustomData_wT = e1.kernelCustomData.wT) !== null && _e_kernelCustomData_wT !== void 0 ? _e_kernelCustomData_wT : e1.compute(Pe(t[1], bo), {
                    inputs: [
                        1
                    ],
                    outputs: [
                        r.wIsConst ? -2 : -1
                    ]
                })[0];
                r.wIsConst && !e1.kernelCustomData.wT && (e1.kernelCustomData.wT = D), k.push(D);
            } else k.push(t[1]);
            t.length === 3 && k.push(t[2]), !e1.adapterInfo.isArchitecture("ampere") && o && t[1].dims[0] === r.group && t[1].dims[1] === 1 && r.dilations[0] === 1 && r.dilations[1] === 1 ? e1.compute(ju(k, r, i, n), {
                inputs: k
            }) : e1.compute(Ku(k, r, i, n), {
                inputs: k
            });
            return;
        }
        let a = t.length === 3, d = t[0].dims[o ? 1 : 2], l = t[0].dims[o ? 2 : 3], p = t[0].dims[o ? 3 : 1], m = t[1].dims[2], u = t[1].dims[3], h = i[o ? 1 : 2], _ = i[o ? 2 : 3], y = i[o ? 3 : 1], g = o && m === d && u === l && r.pads[0] === 0 && r.pads[1] === 0;
        if (g || m === 1 && u === 1 && r.dilations[0] === 1 && r.dilations[1] === 1 && r.strides[0] === 1 && r.strides[1] === 1 && r.pads[0] === 0 && r.pads[1] === 0) {
            let k = i[0], P, D, R, G = [];
            if (o) {
                var _e_kernelCustomData_wT1;
                let V = (_e_kernelCustomData_wT1 = e1.kernelCustomData.wT) !== null && _e_kernelCustomData_wT1 !== void 0 ? _e_kernelCustomData_wT1 : e1.compute(Pe(t[1], bo), {
                    inputs: [
                        1
                    ],
                    outputs: [
                        r.wIsConst ? -2 : -1
                    ]
                })[0];
                if (r.wIsConst && !e1.kernelCustomData.wT && (e1.kernelCustomData.wT = V), g) {
                    let Q = d * l * p;
                    P = t[0].reshape([
                        1,
                        k,
                        Q
                    ]), D = V.reshape([
                        1,
                        Q,
                        y
                    ]), R = [
                        1,
                        k,
                        y
                    ];
                } else P = t[0].reshape([
                    k,
                    d * l,
                    p
                ]), D = V.reshape([
                    1,
                    p,
                    y
                ]), R = [
                    k,
                    h * _,
                    y
                ];
                G.push(P), G.push(D);
            } else P = t[0].reshape([
                k,
                p,
                d * l
            ]), D = t[1].reshape([
                1,
                y,
                p
            ]), R = [
                k,
                y,
                h * _
            ], G.push(D), G.push(P);
            a && G.push(t[2]);
            let K = R[2], j = G[0].dims[G[0].dims.length - 1];
            K < 8 && j < 8 ? e1.compute(Zr(G, r, i, R, o, n), {
                inputs: G
            }) : e1.compute(er(G, r, i, R, o, n), {
                inputs: G
            });
            return;
        }
        var _e_kernelCustomData_wT2;
        let x = !0, $ = (_e_kernelCustomData_wT2 = e1.kernelCustomData.wT) !== null && _e_kernelCustomData_wT2 !== void 0 ? _e_kernelCustomData_wT2 : e1.compute(Pe(t[1], bo), {
            inputs: [
                1
            ],
            outputs: [
                r.wIsConst ? -2 : -1
            ]
        })[0];
        r.wIsConst && !e1.kernelCustomData.wT && (e1.kernelCustomData.wT = $);
        let v = [
            t[0],
            $
        ];
        a && v.push(t[2]);
        let S = o ? h * _ : y, T = o ? y : h * _, A = m * u * p;
        e1.compute(Vu(v, r, i, S, T, A, a, x, n), {
            inputs: v
        });
    }, hf = (e1, t)=>{
        let r = t.format === "NHWC", n = [
            e1.inputs[0].reshape(r ? [
                e1.inputs[0].dims[0],
                1,
                e1.inputs[0].dims[1],
                e1.inputs[0].dims[2]
            ] : [
                e1.inputs[0].dims[0],
                e1.inputs[0].dims[1],
                1,
                e1.inputs[0].dims[2]
            ]),
            e1.inputs[1].reshape([
                e1.inputs[1].dims[0],
                e1.inputs[1].dims[1],
                1,
                e1.inputs[1].dims[2]
            ])
        ];
        e1.inputs.length === 3 && n.push(e1.inputs[2]);
        let o = [
            0,
            t.pads[0],
            0,
            t.pads[1]
        ], i = [
            1
        ].concat(t.strides), a = [
            1
        ].concat(t.dilations), d = [
            1
        ].concat(t.kernelShape), l = yo({
            ...t,
            pads: o,
            strides: i,
            dilations: a,
            kernelShape: d
        }, n);
        Zu(e1, n, l, (p)=>r ? [
                p[0],
                p[2],
                p[3]
            ] : [
                p[0],
                p[1],
                p[3]
            ]);
    }, gf = (e1, t, r)=>{
        let n = r.format === "NHWC" ? "channelsLast" : "channelsFirst", o = yo(r, t), i = r.autoPad === "NOTSET" ? r.pads : r.autoPad, a = Hu(t[0].dims, t[1].dims, r.strides, r.dilations, i, !1, n);
        e1.compute(Fu(t, o, a.outShape, [
            a.filterDepth,
            a.filterHeight,
            a.filterWidth
        ], [
            a.padInfo.front,
            a.padInfo.top,
            a.padInfo.left
        ], n));
    }, wo = (e1, t)=>{
        if (ff(e1.inputs, t), e1.inputs[0].dims.length === 3) hf(e1, t);
        else if (e1.inputs[0].dims.length === 5) gf(e1, e1.inputs, t);
        else {
            let r = yo(t, e1.inputs);
            Zu(e1, e1.inputs, r);
        }
    };
});
var Xu, Ju = U(()=>{
    "use strict";
    te();
    et();
    oe();
    ae();
    Xu = (e1, t, r)=>{
        let n = e1.length > 2, o = t.outputShape, i = t.format === "NHWC", a = t.group, d = e1[1].dims, l = d[2] / a, p = d[3], m = i ? me(l) : 1, u = i ? me(p) : 1, h = i ? p === 1 ? m : u : 1, _ = C.size(o) / u, y = [
            Math.ceil(_ / 64),
            1,
            1
        ];
        ue("verbose", ()=>"[conv2d_backprop_webgpu] dispatch = ".concat(y));
        let g = [
            "rank",
            "rank"
        ], x = [
            t.strides[0],
            t.strides[1]
        ], $ = [
            t.kernelShape[i ? 1 : 2],
            t.kernelShape[i ? 2 : 3]
        ], v = [
            t.dilations[0],
            t.dilations[1]
        ], S = [
            $[0] + (t.dilations[0] <= 1 ? 0 : (t.kernelShape[i ? 1 : 2] - 1) * (t.dilations[0] - 1)),
            $[1] + (t.dilations[1] <= 1 ? 0 : (t.kernelShape[i ? 2 : 3] - 1) * (t.dilations[1] - 1))
        ], T = [
            S[0] - 1 - Math.floor((t.pads[0] + t.pads[2]) / 2),
            S[1] - 1 - Math.floor((t.pads[1] + t.pads[3]) / 2)
        ], A = [
            {
                type: 12,
                data: _
            },
            {
                type: 12,
                data: x
            },
            {
                type: 12,
                data: $
            },
            {
                type: 12,
                data: v
            },
            {
                type: 12,
                data: S
            },
            {
                type: 6,
                data: T
            },
            {
                type: 12,
                data: l
            },
            {
                type: 12,
                data: p
            },
            ...N(e1[0].dims, e1[1].dims)
        ];
        n && (A.push(...N(e1[2].dims)), g.push("rank")), A.push(...N(o));
        let k = (P)=>{
            let D = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "strides",
                    type: "u32",
                    length: x.length
                },
                {
                    name: "filter_dims",
                    type: "u32",
                    length: $.length
                },
                {
                    name: "dilations",
                    type: "u32",
                    length: $.length
                },
                {
                    name: "effective_filter_dims",
                    type: "u32",
                    length: S.length
                },
                {
                    name: "pads",
                    type: "i32",
                    length: T.length
                },
                {
                    name: "input_channels_per_group",
                    type: "u32"
                },
                {
                    name: "output_channels_per_group",
                    type: "u32"
                }
            ], R = _e(e1[0].dataType), G = i ? 1 : 2, K = i ? 2 : 3, j = i ? 3 : 1, V = E("W", e1[1].dataType, e1[1].dims.length, h), Q = E("Dy", e1[0].dataType, e1[0].dims.length, m), se = [
                Q,
                V
            ];
            n && se.push(E("bias", e1[2].dataType, [
                o[j]
            ].length, u));
            let Y = M("result", e1[0].dataType, o.length, u), ee = ()=>{
                let ne = "";
                if (m === 1) ne += "\n        let w_offset = ".concat(V.indicesToOffset("".concat(V.type.indices, "(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)")), ";\n        let wValue = ").concat(V.getByOffset("w_offset / ".concat(h)), ";\n        dotProd = dotProd + xValue * wValue;");
                else if (p === 1) ne += "\n          let wValue = ".concat(V.getByOffset("".concat(V.indicesToOffset("".concat(V.type.indices, "(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)")), " / ").concat(h)), ";\n          dotProd = dotProd + dot(xValue, wValue);");
                else for(let be = 0; be < m; be++)ne += "\n            let wValue".concat(be, " = ").concat(V.getByOffset("".concat(V.indicesToOffset("".concat(V.type.indices, "(u32(wRPerm), u32(wCPerm), inputChannel + ").concat(be, ", wOutChannel)")), " / ").concat(h)), ";\n            dotProd = dotProd + xValue[").concat(be, "] * wValue").concat(be, ";");
                return ne;
            }, J = "\n            let outputIndices = ".concat(Y.offsetToIndices("global_idx * ".concat(u)), ";\n            let batch = ").concat(Y.indicesGet("outputIndices", 0), ";\n            let d1 = ").concat(Y.indicesGet("outputIndices", j), ";\n            let r = ").concat(Y.indicesGet("outputIndices", G), ";\n            let c = ").concat(Y.indicesGet("outputIndices", K), ";\n            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;\n            let dyRCorner = dyCorner.x;\n            let dyCCorner = dyCorner.y;\n            let groupId = d1 / uniforms.output_channels_per_group;\n            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;\n            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n            // ? = to be determined. : = across all values in that axis.\n            var dotProd = ").concat(Y.type.value, "(0.0);\n            for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {\n              if (wR % uniforms.dilations.x != 0) {\n                continue;\n              }\n              let dyR = (").concat(R, "(dyRCorner) + ").concat(R, "(wR)) / ").concat(R, "(uniforms.strides[0]);\n              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;\n              if (dyR < 0.0 || dyR >= ").concat(R, "(uniforms.Dy_shape[").concat(G, "]) || fract(dyR) > 0.0 ||\n                  wRPerm < 0) {\n                continue;\n              }\n              wR = wR + uniforms.strides[0] - 1;\n              let idyR: u32 = u32(dyR);\n\n              for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {\n                if (wC % uniforms.dilations.y != 0) {\n                  continue;\n                }\n                let dyC = (").concat(R, "(dyCCorner) + ").concat(R, "(wC)) / ").concat(R, "(uniforms.strides.y);\n                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;\n                if (dyC < 0.0 || dyC >= ").concat(R, "(uniforms.Dy_shape[").concat(K, "]) ||\n                    fract(dyC) > 0.0 || wCPerm < 0) {\n                  continue;\n                }\n                wC = wC + uniforms.strides.y - 1;\n                let idyC: u32 = u32(dyC);\n                var inputChannel = groupId * uniforms.input_channels_per_group;\n                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + ").concat(m, ") {\n                  let xValue = ").concat(i ? Q.getByOffset("".concat(Q.indicesToOffset("".concat(Q.type.indices, "(batch, idyR, idyC, inputChannel)")), " / ").concat(m)) : Q.get("batch", "inputChannel", "idyR", "idyC"), ";\n                  ").concat(ee(), "\n                  inputChannel = inputChannel + ").concat(m, ";\n                }\n              }\n            }\n            let value = dotProd").concat(n ? " + bias[d1 / ".concat(u, "]") : "", ";\n            ").concat(Y.setByOffset("global_idx", "value"), ";\n          ");
            return "\n    ".concat(P.registerUniforms(D).declareVariables(...se, Y), "\n      ").concat(P.mainStart(), "\n      ").concat(P.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), ";\n    ").concat(J, "}");
        };
        return {
            name: "ConvTranspose2D",
            shaderCache: {
                hint: "".concat(t.cacheKey, ";").concat(m).concat(h).concat(u).concat(p === 1),
                inputDependencies: g
            },
            getRunData: ()=>({
                    dispatchGroup: {
                        x: y[0],
                        y: y[1],
                        z: y[2]
                    },
                    outputs: [
                        {
                            dims: r ? r(o) : o,
                            dataType: e1[0].dataType
                        }
                    ],
                    programUniforms: A
                }),
            getShaderSource: k
        };
    };
});
var bf, yf, _f, ed, td, wf, rd, vf, nd, od = U(()=>{
    "use strict";
    Ju();
    yt();
    dt();
    bf = (e1, t, r, n, o, i)=>(e1 - 1) * t + r + (n - 1) * o + 1 - i, yf = (e1, t, r, n, o)=>{
        let i = Math.floor(e1 / 2);
        t === "SAME_UPPER" ? (r[n] = i, r[o] = e1 - i) : t === "SAME_LOWER" && (r[n] = e1 - i, r[o] = i);
    }, _f = (e1, t, r, n, o, i, a, d, l, p)=>{
        let m = e1.length - 2, u = p.length === 0;
        l.length < m && l.push(...Array(m - l.length).fill(0));
        let h = e1[0], _ = t[d ? 3 : 1] * o;
        for(let y = 0, g = e1.length - m - (d ? 1 : 0); y < m; ++y, ++g){
            let x = e1[g], $ = u ? x * a[y] : p[y], v = bf(x, a[y], i[y], t[g], r[y], $);
            yf(v, n, i, y, y + m), u && p.push(a[y] * (x - 1) + l[y] + (t[g] - 1) * r[y] + 1 - i[y] - i[y + m]);
        }
        p.splice(0, 0, h), p.splice(d ? 3 : 1, 0, _);
    }, ed = (e1, t)=>{
        let r = e1.kernelShape.slice();
        if (e1.kernelShape.length === 0 || e1.kernelShape.reduce((u, h)=>u * h, 1) === 0) {
            r.length = 0;
            for(let u = 2; u < t[1].dims.length; ++u)r.push(t[1].dims[u]);
        }
        let n = e1.format === "NHWC";
        r.splice(0, 0, t[1].dims[0]), r.splice(n ? 3 : 1, 0, t[1].dims[1]);
        let o = e1.pads.slice(), i = e1.outputShape.slice(), a = e1.outputPadding.slice(), d = t[0].dims, l = e1.dilations.slice();
        if (l.reduce((u, h)=>u + h, 0) === 0) {
            let u = t[0].dims.length - 2;
            l = new Array(u).fill(1);
        }
        let p = e1.strides.slice();
        if (p.reduce((u, h)=>u + h, 0) === 0) {
            let u = t[0].dims.length - 2;
            p = new Array(u).fill(1);
        }
        _f(d, r, l, e1.autoPad, e1.group, o, p, n, a, i);
        let m = Object.assign({}, e1);
        return Object.assign(m, {
            kernelShape: r,
            pads: o,
            outputPadding: a,
            outputShape: i,
            dilations: l,
            strides: p
        }), m;
    }, td = (e1)=>{
        let t = jr(e1), r = e1.format, n = [
            "NOTSET",
            "VALID",
            "SAME_UPPER",
            "SAME_LOWER"
        ][typeof e1.autoPad > "u" ? 0 : e1.autoPad], o = e1.dilations, i = e1.group, a = e1.kernelShape, d = e1.pads, l = e1.strides, p = e1.wIsConst(), m = e1.outputPadding, u = e1.outputShape;
        return {
            autoPad: n,
            format: r,
            dilations: o,
            group: i,
            kernelShape: a,
            outputPadding: m,
            outputShape: u,
            pads: d,
            strides: l,
            wIsConst: p,
            ...t,
            cacheKey: "".concat(e1.format, ";").concat(t.activation, ";")
        };
    }, wf = (e1, t)=>{
        if (!e1 || e1.length !== 2 && e1.length !== 3) throw new Error("Conv requires 2 or 3 inputs");
        if (e1[0].dims.length !== 4 && e1[0].dims.length !== 3) throw new Error("currently only support 2-dimensional conv");
        if (e1[0].dims.length !== e1[1].dims.length) throw new Error("filter does not have same dimension as input");
        let r = e1[0].dims[t.format === "NHWC" ? e1[0].dims.length - 1 : 1], n = e1[1].dims[0];
        if (r !== n) throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");
        let o = e1[1].dims[1] * t.group;
        if (e1.length === 3 && (e1[2].dims.length !== 1 || e1[2].dims[0] !== o)) throw new Error("invalid bias");
        let i = e1[0].dims.length - 2;
        if (t.dilations.reduce((m, u)=>m + u, 0) > 0 && t.dilations.length !== i) throw new Error("dilations should be ".concat(i, "D"));
        if (t.strides.reduce((m, u)=>m + u, 0) > 0 && t.strides.length !== i) throw new Error("strides should be ".concat(i, "D"));
        if (t.pads.reduce((m, u)=>m + u, 0) > 0 && t.pads.length !== i * 2) throw new Error("pads should be ".concat(i * 2, "D"));
        if (t.outputPadding.length !== i && t.outputPadding.length !== 0) throw new Error("output_padding should be ".concat(i, "D"));
        if (t.kernelShape.reduce((m, u)=>m + u, 0) > 0 && t.kernelShape.length !== 0 && t.kernelShape.length !== e1[1].dims.length - 2) throw new Error("invalid kernel shape");
        if (t.outputShape.length !== 0 && t.outputShape.length !== e1[0].dims.length - 2) throw new Error("invalid output shape");
    }, rd = (e1, t, r, n)=>{
        var _e_kernelCustomData_wT;
        let o = (_e_kernelCustomData_wT = e1.kernelCustomData.wT) !== null && _e_kernelCustomData_wT !== void 0 ? _e_kernelCustomData_wT : e1.compute(Pe(t[1], [
            2,
            3,
            0,
            1
        ]), {
            inputs: [
                1
            ],
            outputs: [
                r.wIsConst ? -2 : -1
            ]
        })[0];
        r.wIsConst && !e1.kernelCustomData.wT && (e1.kernelCustomData.wT = o);
        let i = [
            t[0],
            o
        ];
        t.length === 3 && i.push(t[2]), e1.compute(Xu(i, r, n), {
            inputs: i
        });
    }, vf = (e1, t)=>{
        let r = t.format === "NHWC", n = [
            e1.inputs[0].reshape(r ? [
                e1.inputs[0].dims[0],
                1,
                e1.inputs[0].dims[1],
                e1.inputs[0].dims[2]
            ] : [
                e1.inputs[0].dims[0],
                e1.inputs[0].dims[1],
                1,
                e1.inputs[0].dims[2]
            ]),
            e1.inputs[1].reshape([
                e1.inputs[1].dims[0],
                e1.inputs[1].dims[1],
                1,
                e1.inputs[1].dims[2]
            ])
        ];
        e1.inputs.length === 3 && n.push(e1.inputs[2]);
        let o = t.kernelShape;
        (o.length === 0 || o[0] === 0) && (o = [
            e1.inputs[1].dims[2]
        ]);
        let i = t.dilations;
        (i.length === 0 || i[0] === 0) && (i = [
            1
        ]);
        let a = t.strides;
        (a.length === 0 || a[0] === 0) && (a = [
            1
        ]);
        let d = t.pads;
        d.length === 0 && (d = [
            0,
            0
        ]), d = [
            0,
            d[0],
            0,
            d[1]
        ], a = [
            1
        ].concat(a), i = [
            1
        ].concat(i), o = [
            1
        ].concat(o);
        let l = ed({
            ...t,
            pads: d,
            strides: a,
            dilations: i,
            kernelShape: o
        }, n);
        rd(e1, n, l, (p)=>r ? [
                p[0],
                p[2],
                p[3]
            ] : [
                p[0],
                p[1],
                p[3]
            ]);
    }, nd = (e1, t)=>{
        if (wf(e1.inputs, t), e1.inputs[0].dims.length === 3) vf(e1, t);
        else {
            let r = ed(t, e1.inputs);
            rd(e1, e1.inputs, r);
        }
    };
});
var $f, id, ad, sd = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    $f = (e1, t, r, n)=>{
        let o = C.size(t), i = t.length, a = E("input", e1, i), d = M("output", e1, i), l = r.dataType === 6 ? r.getInt32Array()[0] : Number(r.getBigInt64Array()[0]), p = C.normalizeAxis(l, i), m = (u)=>{
            let h = " i32(".concat(a.indicesGet("inputIndices", "uniforms.axis"), ") "), _ = F("uniforms.input_shape", "uniforms.axis", i), y = n.reverse ? h + (n.exclusive ? " + 1" : "") : "0", g = n.reverse ? _ : h + (n.exclusive ? "" : " + 1");
            return "\n                ".concat(u.registerUniform("outputSize", "u32").registerUniform("axis", "u32").declareVariables(a, d), "\n                ").concat(u.mainStart(), "\n                  ").concat(u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n                  var inputIndices = ").concat(d.offsetToIndices("global_idx"), ";\n                  var sum = ").concat(d.type.value, "(0);\n                  let first : i32 = ").concat(y, ";\n                  let last : i32 = ").concat(g, ";\n                  for (var i : i32 = first; i < last; i++) {\n                    ").concat(a.indicesSet("inputIndices", "uniforms.axis", "u32(i)"), ";\n                    sum = sum + ").concat(a.getByIndices("inputIndices"), ";\n                  }\n                  ").concat(d.setByOffset("global_idx", "sum"), ";\n                }");
        };
        return {
            name: "CumSum",
            shaderCache: {
                hint: n.cacheKey,
                inputDependencies: [
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: t,
                            dataType: e1
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(o / 64)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: o
                        },
                        {
                            type: 12,
                            data: p
                        },
                        ...N(t, t)
                    ]
                }),
            getShaderSource: m
        };
    }, id = (e1, t)=>{
        let r = e1.inputs[0].dims, n = e1.inputs[0].dataType, o = e1.inputs[1];
        e1.compute($f(n, r, o, t), {
            inputs: [
                0
            ]
        });
    }, ad = (e1)=>{
        let t = e1.exclusive === 1, r = e1.reverse === 1;
        return re({
            exclusive: t,
            reverse: r
        });
    };
});
var xf, Sf, Tf, ud, dd, ld = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    xf = (e1)=>{
        if (!e1 || e1.length !== 1) throw new Error("DepthToSpace requires 1 input.");
        if (e1[0].dims.length !== 4) throw new Error("DepthToSpace requires 4D input.");
    }, Sf = (e1, t, r, n)=>{
        let o = [];
        o.push("fn perm(i: ".concat(n.type.indices, ") -> ").concat(r.type.indices, " {\n    var a: ").concat(r.type.indices, ";"));
        for(let i = 0; i < t; ++i)o.push(r.indicesSet("a", e1[i], "i[".concat(i, "]")));
        return o.push("return a;}"), o.join("\n");
    }, Tf = (e1, t)=>{
        let r, n, o, i, a, d, l = t.format === "NHWC", p = t.blocksize, m = t.mode === "DCR";
        l ? ([r, n, o, i] = e1.dims, a = m ? [
            r,
            n,
            o,
            p,
            p,
            i / p ** 2
        ] : [
            r,
            n,
            o,
            i / p ** 2,
            p,
            p
        ], d = m ? [
            0,
            1,
            3,
            2,
            4,
            5
        ] : [
            0,
            1,
            4,
            2,
            5,
            3
        ]) : ([r, n, o, i] = [
            e1.dims[0],
            e1.dims[2],
            e1.dims[3],
            e1.dims[1]
        ], a = m ? [
            r,
            p,
            p,
            i / p ** 2,
            n,
            o
        ] : [
            r,
            i / p ** 2,
            p,
            p,
            n,
            o
        ], d = m ? [
            0,
            3,
            4,
            1,
            5,
            2
        ] : [
            0,
            1,
            4,
            2,
            5,
            3
        ]);
        let u = e1.reshape(a), h = u.dims.length, _ = e1.dataType, y = E("a", _, h), g = M("output", _, h), x = ($)=>"\n  ".concat($.registerUniform("output_size", "u32").declareVariables(y, g), "\n\n  ").concat(Sf(d, h, y, g), "\n\n  ").concat($.mainStart(), "\n    ").concat($.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n\n    let indices = ").concat(g.offsetToIndices("global_idx"), ";\n    let aIndices = perm(indices);\n\n    ").concat(g.setByOffset("global_idx", y.getByIndices("aIndices")), "\n  }");
        return {
            name: "DepthToSpace",
            shaderCache: {
                hint: "".concat(e1.dims, ";").concat(t.blocksize, ";").concat(t.mode),
                inputDependencies: [
                    "rank"
                ]
            },
            getRunData: ($)=>{
                let v = l ? [
                    r,
                    n * p,
                    o * p,
                    i / p ** 2
                ] : [
                    r,
                    i / p ** 2,
                    n * p,
                    o * p
                ], S = C.size(v), T = u.dims, A = C.sortBasedOnPerm(T, d);
                return {
                    outputs: [
                        {
                            dims: v,
                            dataType: $[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(S / 64)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: S
                        },
                        ...N(T, A)
                    ]
                };
            },
            getShaderSource: x
        };
    }, ud = (e1, t)=>{
        xf(e1.inputs), e1.compute(Tf(e1.inputs[0], t));
    }, dd = (e1)=>re({
            blocksize: e1.blocksize,
            mode: e1.mode,
            format: e1.format
        });
});
var vo, en, cd, If, Cf, $o, xo, pd, Af, md, fd, hd = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    vo = "[a-zA-Z]|\\.\\.\\.", en = "(" + vo + ")+", cd = "^" + en + "$", If = "(" + en + ",)*" + en, Cf = "^" + If + "$", $o = class {
        addSymbol(t, r) {
            let n = this.symbolToIndices.get(t);
            n === void 0 ? n = [
                r
            ] : n.push(r), this.symbolToIndices.set(t, n);
        }
        constructor(t = -1){
            this.symbolToIndices = new Map, this.inputIndex = t;
        }
    }, xo = class {
        addSymbol(t, r, n) {
            let o = this.symbolToInfo.get(t);
            if (o !== void 0) {
                if (o.dimValue !== r && o.count !== 1) throw new Error("Dimension mismatch");
                o.count++, o.inputIndices.push(n);
            } else o = {
                count: 1,
                dimValue: r,
                inputIndices: [
                    n
                ]
            };
            this.symbolToInfo.set(t, o);
        }
        processTerm(t, r, n) {
            let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : -1;
            let i = n.length, a = !1, d = [], l = 0;
            if (!t.match(RegExp(cd)) && !r && t !== "") throw new Error("Invalid LHS term");
            let p = t.match(RegExp(vo, "g")), m = new $o(o);
            return p === null || p === void 0 ? void 0 : p.forEach((u, h)=>{
                if (u === "...") {
                    if (a) throw new Error("Only one ellipsis is allowed per input term");
                    a = !0;
                    let _ = i - p.length + 1;
                    if (_ < 0) throw new Error("Ellipsis out of bounds");
                    if (d = n.slice(l, l + _), this.hasEllipsis) {
                        if (this.ellipsisDims.length !== d.length || this.ellipsisDims.toString() !== d.toString()) throw new Error("Ellipsis dimensions mismatch");
                    } else if (r) this.hasEllipsis = !0, this.ellipsisDims = d;
                    else throw new Error("Ellipsis must be specified in the LHS");
                    for(let y = 0; y < d.length; y++){
                        let g = String.fromCharCode("0".charCodeAt(0) + y);
                        m.addSymbol(g, h + y), this.addSymbol(g, n[l++], o);
                    }
                } else m.addSymbol(u, h + (this.hasEllipsis ? this.ellipsisDims.length - 1 : 0)), this.addSymbol(u, n[l++], o);
            }), m;
        }
        constructor(t, r){
            var _o_match;
            this.equation = r;
            this.hasEllipsis = !1, this.symbolToInfo = new Map, this.lhs = new Array, this.outputDims = [];
            let [n, o] = r.includes("->") ? r.split("->", 2) : [
                r,
                ""
            ];
            if (!n.match(RegExp(Cf))) throw new Error("Invalid LHS term");
            if (n.split(",").forEach((d, l)=>{
                let p = t[l].dims.slice();
                if (!d.match(RegExp(cd))) throw new Error("Invalid LHS term");
                let m = this.processTerm(d, !0, p, l);
                this.lhs.push(m);
            }), o === "") o += [
                ...this.symbolToInfo.entries()
            ].filter((param)=>{
                let [d, l] = param;
                return l.count === 1 || d === "...";
            }).map((param)=>{
                let [d] = param;
                return d;
            }).join("");
            else if (!o.match(RegExp(en))) throw new Error("Invalid RHS");
            (_o_match = o.match(RegExp(vo, "g"))) === null || _o_match === void 0 ? void 0 : _o_match.forEach((d)=>{
                if (d === "...") this.outputDims = this.outputDims.concat(this.ellipsisDims);
                else {
                    let l = this.symbolToInfo.get(d);
                    if (l === void 0) throw new Error("Invalid RHS symbol");
                    this.outputDims.push(l.dimValue);
                }
            }), this.rhs = this.processTerm(o, !1, this.outputDims);
        }
    }, pd = (e1)=>e1 + "_max", Af = (e1, t, r, n)=>{
        let i = e1.map((m)=>m.length).map((m, u)=>E("input".concat(u), t, m)), a = C.size(n), d = M("output", t, n.length), l = [
            ...r.symbolToInfo.keys()
        ].filter((m)=>!r.rhs.symbolToIndices.has(m)), p = (m)=>{
            let u = [], h = "var prod = 1.0;", _ = "var sum = 0.0;", y = "sum += prod;", g = [], x = [], $ = [], v = [], S = r.symbolToInfo.size === r.rhs.symbolToIndices.size;
            r.symbolToInfo.forEach((A, k)=>{
                if (r.rhs.symbolToIndices.has(k)) {
                    var _r_rhs_symbolToIndices_get;
                    let P = (_r_rhs_symbolToIndices_get = r.rhs.symbolToIndices.get(k)) === null || _r_rhs_symbolToIndices_get === void 0 ? void 0 : _r_rhs_symbolToIndices_get[0];
                    P !== void 0 && r.lhs.forEach((D, R)=>{
                        if (A.inputIndices.includes(R)) {
                            let G = D.symbolToIndices.get(k);
                            if (G === void 0) throw new Error("Invalid symbol error");
                            G.forEach((K)=>{
                                u.push("".concat(i[R].indicesSet("input".concat(R, "Indices"), K, d.indicesGet("outputIndices", P))));
                            });
                        }
                    });
                } else r.lhs.forEach((P, D)=>{
                    if (A.inputIndices.includes(D)) {
                        let R = P.symbolToIndices.get(k);
                        if (R === void 0) throw new Error("Invalid symbol error");
                        R.forEach((G)=>{
                            g.push("".concat(i[D].indicesSet("input".concat(D, "Indices"), G, "".concat(k))));
                        }), v.push("prod *= ".concat(i[D].getByIndices("input".concat(D, "Indices")), ";"));
                    }
                }), x.push("for(var ".concat(k, ": u32 = 0; ").concat(k, " < uniforms.").concat(pd(k), "; ").concat(k, "++) {")), $.push("}");
            });
            let T = S ? [
                ...u,
                "let sum = ".concat(i.map((A, k)=>A.getByIndices("input".concat(k, "Indices"))).join(" * "), ";")
            ] : [
                ...u,
                _,
                ...x,
                ...g,
                h,
                ...v,
                y,
                ...$
            ];
            return "\n            ".concat(m.registerUniforms(l.map((A)=>({
                    name: "".concat(pd(A)),
                    type: "u32"
                }))).registerUniform("outputSize", "u32").declareVariables(...i, d), "\n\n            ").concat(m.mainStart(), "\n            ").concat(m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n            var outputIndices = ").concat(d.offsetToIndices("global_idx"), ";\n            ").concat(i.map((A, k)=>"var input".concat(k, "Indices: ").concat(i[k].type.indices, ";")).join("\n"), "\n            ").concat(T.join("\n"), ";\n            ").concat(d.setByOffset("global_idx", "sum"), ";\n          }");
        };
        return {
            name: "Einsum",
            shaderCache: {
                hint: r.equation,
                inputDependencies: e1.map(()=>"rank")
            },
            getRunData: ()=>{
                let m = l.filter((h)=>r.symbolToInfo.has(h)).map((h)=>{
                    var _r_symbolToInfo_get;
                    return {
                        type: 12,
                        data: ((_r_symbolToInfo_get = r.symbolToInfo.get(h)) === null || _r_symbolToInfo_get === void 0 ? void 0 : _r_symbolToInfo_get.dimValue) || 0
                    };
                });
                m.push({
                    type: 12,
                    data: a
                });
                let u = e1.map((h, _)=>[
                        ...N(h)
                    ]).reduce((h, _)=>h.concat(_), m);
                return u.push(...N(n)), {
                    outputs: [
                        {
                            dims: n,
                            dataType: t
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(a / 64)
                    },
                    programUniforms: u
                };
            },
            getShaderSource: p
        };
    }, md = (e1, t)=>{
        let r = new xo(e1.inputs, t.equation), n = r.outputDims, o = e1.inputs.map((i, a)=>i.dims);
        e1.compute(Af(o, e1.inputs[0].dataType, r, n));
    }, fd = (e1)=>{
        let t = e1.equation.replace(/\s+/g, "");
        return re({
            equation: t
        });
    };
});
var kf, gd, Ef, Pf, bd, yd = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    kf = (e1)=>{
        if (!e1 || e1.length !== 2) throw new Error("Expand requires 2 input.");
        let t = e1[0].dims, r = Array.from(e1[1].getBigInt64Array(), Number), n = r.length < t.length ? 0 : r.length - t.length, o = t.length < r.length ? 0 : t.length - r.length;
        for(; n < r.length && o < t.length; ++n, ++o)if (r[n] !== t[o] && r[n] !== 1 && t[o] !== 1) throw new Error("Expand requires shape to be broadcastable to input");
    }, gd = (e1, t)=>{
        let r = e1.length - t.length, n = [];
        for(let o = 0; o < r; ++o)n.push(e1[o]);
        for(let o = 0; o < t.length; ++o)n.push(t[o] === 1 ? e1[o + r] : t[o]);
        return n;
    }, Ef = (e1, t)=>e1.length > t.length ? gd(e1, t) : gd(t, e1), Pf = (e1)=>{
        let t = e1[0].dims, r = Array.from(e1[1].getBigInt64Array(), Number), n = Ef(t, r), o = e1[0].dataType, i = o === 9 || C.size(t) === 1, a = o === 9 || t.length > 0 && t[t.length - 1] % 4 === 0 ? 4 : 1, d = i || n.length > 0 && n[n.length - 1] % 4 === 0 ? 4 : 1, l = Math.ceil(C.size(n) / d), p = (u)=>{
            let h = E("input", o, t.length, a), _ = M("output", o, n.length, d), y;
            if (o === 9) {
                let g = function(x, $) {
                    let v = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
                    return "\n          let outputIndices".concat($, " = ").concat(_.offsetToIndices("outputOffset + ".concat($, "u")), ";\n          let offset").concat($, " = ").concat(h.broadcastedIndicesToOffset("outputIndices".concat($), _), ";\n          let index").concat($, " = offset").concat($, " / 4u;\n          let component").concat($, " = offset").concat($, " % 4u;\n          ").concat(x, "[").concat($, "] = ").concat(v, "(").concat(h.getByOffset("index".concat($)), "[component").concat($, "]);\n        ");
                };
                y = "\n        let outputOffset = global_idx * ".concat(d, ";\n        var data = vec4<u32>(0);\n        ").concat(g("data", 0, "u32"), "\n        ").concat(g("data", 1, "u32"), "\n        ").concat(g("data", 2, "u32"), "\n        ").concat(g("data", 3, "u32"), "\n        ").concat(_.setByOffset("global_idx", "data"), "\n      }");
            } else y = "\n        let outputIndices = ".concat(_.offsetToIndices("global_idx * ".concat(d)), ";\n        let inputOffset = ").concat(h.broadcastedIndicesToOffset("outputIndices", _), ";\n        let data = ").concat(_.type.value, "(").concat(h.getByOffset("inputOffset / ".concat(a)), ");\n        ").concat(_.setByOffset("global_idx", "data"), "\n      }");
            return "\n    ".concat(u.registerUniform("vec_size", "u32").declareVariables(h, _), "\n    ").concat(u.mainStart(), "\n    ").concat(u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size"), "\n    ").concat(y);
        }, m = [
            {
                type: 12,
                data: l
            },
            ...N(t, n)
        ];
        return {
            name: "Expand",
            shaderCache: {
                hint: "".concat(n.length, ";").concat(a).concat(d),
                inputDependencies: [
                    "rank"
                ]
            },
            getShaderSource: p,
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: n,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(l / 64)
                    },
                    programUniforms: m
                })
        };
    }, bd = (e1)=>{
        kf(e1.inputs), e1.compute(Pf(e1.inputs), {
            inputs: [
                0
            ]
        });
    };
});
var zf, _d, wd = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    Kr();
    zf = (e1)=>{
        let t = e1[0].dataType, r = C.size(e1[0].dims), n = C.size(e1[1].dims), o = n % 4 === 0, i = (a)=>{
            let d = E("x", t, [
                1
            ], 4), l = E("bias", t, [
                1
            ], 4), p = M("y", t, [
                1
            ], 4), m = [
                {
                    name: "output_vec_size",
                    type: "u32"
                },
                {
                    name: "bias_size",
                    type: "u32"
                }
            ], u = (_)=>"\n      let bias".concat(_, "_offset: u32 = (global_idx * 4 + ").concat(_, ") % uniforms.bias_size;\n      let bias").concat(_, " = ").concat(l.getByOffset("bias".concat(_, "_offset / 4")), "[bias").concat(_, "_offset % 4];"), h = o ? "\n      let bias = ".concat(l.getByOffset("global_idx % (uniforms.bias_size / 4)"), ";") : "".concat(u(0)).concat(u(1)).concat(u(2)).concat(u(3), "\n      let bias = ").concat(d.type.value, "(bias0, bias1, bias2, bias3);");
            return "".concat(a.registerUniforms(m).declareVariables(d, l, p), "\n\n    ").concat(mo(Ee(t)), "\n\n    ").concat(a.mainStart(kt), "\n      ").concat(a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size"), "\n\n      let x = ").concat(d.getByOffset("global_idx"), ";\n      ").concat(h, "\n      let x_in = x + bias;\n      ").concat(p.setByOffset("global_idx", fo("x_in")), "\n    }");
        };
        return {
            name: "FastGeluWithBias",
            shaderCache: {
                hint: "".concat(o),
                inputDependencies: [
                    "type",
                    "type"
                ]
            },
            getShaderSource: i,
            getRunData: (a)=>({
                    outputs: [
                        {
                            dims: a[0].dims,
                            dataType: a[0].dataType
                        }
                    ],
                    programUniforms: [
                        {
                            type: 12,
                            data: Math.ceil(r / 4)
                        },
                        {
                            type: 12,
                            data: n
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(r / kt / 4)
                    }
                })
        };
    }, _d = (e1)=>{
        e1.inputs.length < 2 || C.size(e1.inputs[1].dims) === 0 ? hu(e1) : e1.compute(zf(e1.inputs));
    };
});
var Of, Df, vd, $d, xd = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Of = (e1)=>{
        if (!e1 || e1.length !== 2) throw new Error("Gather requires 2 inputs.");
    }, Df = (e1, t)=>{
        let r = e1[0].dims, n = e1[1].dims, o = r.length, i = C.normalizeAxis(t.axis, o), a = r.slice(0);
        a.splice(i, 1, ...n);
        let d = r[i], l = e1[0].dataType === 9 ? 4 : 1, p = Math.ceil(C.size(a) / l), m = [
            {
                type: 12,
                data: p
            },
            {
                type: 6,
                data: d
            },
            {
                type: 12,
                data: i
            },
            ...N(e1[0].dims, e1[1].dims, a)
        ], u = (h)=>{
            let _ = E("data", e1[0].dataType, e1[0].dims.length, l), y = E("inputIndices", e1[1].dataType, e1[1].dims.length), g = M("output", e1[0].dataType, a.length, l), x = (v)=>{
                let S = n.length, T = "var indicesIndices".concat(v, "  = ").concat(y.type.indices, "(0);");
                for(let A = 0; A < S; A++)T += "".concat(S > 1 ? "indicesIndices".concat(v, "[").concat(A, "]") : "indicesIndices".concat(v), " = ").concat(a.length > 1 ? "outputIndices".concat(v, "[uniforms.axis + ").concat(A, "]") : "outputIndices".concat(v), ";");
                T += "\n          var idx".concat(v, " = ").concat(y.getByIndices("indicesIndices".concat(v)), ";\n          if (idx").concat(v, " < 0) {\n            idx").concat(v, " = idx").concat(v, " + uniforms.axisDimLimit;\n          }\n          var dataIndices").concat(v, " : ").concat(_.type.indices, ";\n        ");
                for(let A = 0, k = 0; A < o; A++)A === i ? (T += "".concat(o > 1 ? "dataIndices".concat(v, "[").concat(A, "]") : "dataIndices".concat(v), " = u32(idx").concat(v, ");"), k += S) : (T += "".concat(o > 1 ? "dataIndices".concat(v, "[").concat(A, "]") : "dataIndices".concat(v), " = ").concat(a.length > 1 ? "outputIndices".concat(v, "[").concat(k, "]") : "outputIndices".concat(v), ";"), k++);
                return T;
            }, $;
            if (e1[0].dataType === 9) {
                let v = function(S, T) {
                    let A = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
                    return "\n          let outputIndices".concat(T, " = ").concat(g.offsetToIndices("outputOffset + ".concat(T, "u")), ";\n          ").concat(x(T), ";\n          let offset").concat(T, " = ").concat(_.indicesToOffset("dataIndices".concat(T)), ";\n          let index").concat(T, " = offset").concat(T, " / 4u;\n          let component").concat(T, " = offset").concat(T, " % 4u;\n          ").concat(S, "[").concat(T, "] = ").concat(A, "(").concat(_.getByOffset("index".concat(T)), "[component").concat(T, "]);\n        ");
                };
                $ = "\n        let outputOffset = global_idx * ".concat(l, ";\n        var value = vec4<u32>(0);\n        ").concat(v("value", 0, "u32"), "\n        ").concat(v("value", 1, "u32"), "\n        ").concat(v("value", 2, "u32"), "\n        ").concat(v("value", 3, "u32"), "\n        ").concat(g.setByOffset("global_idx", "value"), "\n      ");
            } else $ = "\n      let outputIndices = ".concat(g.offsetToIndices("global_idx"), ";\n      ").concat(x(""), ";\n      let value = ").concat(_.getByIndices("dataIndices"), ";\n      ").concat(g.setByOffset("global_idx", "value"), ";\n      ");
            return "\n      ".concat(h.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(_, y, g), "\n      ").concat(h.mainStart(), "\n        ").concat(h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n        ").concat($, "\n      }");
        };
        return {
            name: "Gather",
            shaderCache: {
                hint: t.cacheKey,
                inputDependencies: [
                    "rank",
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: a,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(p / 64)
                    },
                    programUniforms: m
                }),
            getShaderSource: u
        };
    }, vd = (e1)=>re({
            axis: e1.axis
        }), $d = (e1, t)=>{
        let r = e1.inputs;
        Of(r), e1.compute(Df(e1.inputs, t));
    };
});
var Bf, Sd, Td, Id = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    Bf = (e1, t, r, n, o, i, a, d, l)=>{
        let p = [
            {
                type: 12,
                data: i
            },
            {
                type: 12,
                data: n
            },
            {
                type: 12,
                data: o
            },
            {
                type: 12,
                data: r
            },
            {
                type: 12,
                data: a
            },
            {
                type: 12,
                data: d
            },
            {
                type: 12,
                data: l
            }
        ], m = [
            i
        ];
        p.push(...N(t.dims, m));
        let u = (h)=>{
            let _ = E("indices_data", t.dataType, t.dims.length), y = M("input_slice_offsets_data", 12, 1, 1), g = [
                _,
                y
            ], x = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "batch_dims",
                    type: "u32"
                },
                {
                    name: "input_dims",
                    type: "u32",
                    length: o.length
                },
                {
                    name: "sizes_from_slice_dims_data",
                    type: "u32",
                    length: r.length
                },
                {
                    name: "num_slices_per_batch",
                    type: "u32"
                },
                {
                    name: "input_batch_stride",
                    type: "u32"
                },
                {
                    name: "num_slice_dims",
                    type: "u32"
                }
            ];
            return "\n  ".concat(h.registerUniforms(x).declareVariables(...g), "\n  ").concat(h.mainStart(), "\n    ").concat(h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n    let batch_idx = global_idx / uniforms.num_slices_per_batch;\n    let base_offset = batch_idx * uniforms.input_batch_stride;\n\n    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;\n    var relative_slice_offset = 0;\n    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {\n      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);\n      let input_dim_idx = uniforms.batch_dims + dim_idx;\n      if (index < 0) {\n        ").concat(o.length === 1 ? "index += i32(uniforms.input_dims);" : "index += i32(uniforms.input_dims[input_dim_idx]);", "\n      }\n      ").concat(r.length === 1 ? "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);" : "relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);", "\n    }\n\n    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);\n  }");
        };
        return e1.compute({
            name: "computeSliceOffsets",
            shaderCache: {
                hint: "".concat(o.length, "_").concat(r.length),
                inputDependencies: [
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: m,
                            dataType: e1.inputs[1].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(i / 64)
                    },
                    programUniforms: p
                }),
            getShaderSource: u
        }, {
            inputs: [
                t
            ],
            outputs: [
                -1
            ]
        })[0];
    }, Sd = (e1, t)=>{
        let r = e1.inputs, n = r[0].dims, o = r[0].dataType, i = r[1].dims, a = i[i.length - 1], d = C.sizeToDimension(i, i.length - 1), l = C.sizeFromDimension(n, t.batchDims + a), p = C.sizeToDimension(n, t.batchDims), m = C.sizeFromDimension(n, t.batchDims), u = d / p, h = new Array(a), _ = l;
        for(let T = 0; T < a; ++T)h[a - 1 - T] = _, _ *= n[t.batchDims + a - 1 - T];
        let y = Bf(e1, r[1], h, t.batchDims, n, d, u, m, a), g = t.batchDims + a;
        if (g > n.length) throw new Error("last dimension of indices must not be larger than rank of input tensor");
        let x = i.slice(0, -1).concat(n.slice(g)), $ = C.size(x), v = [
            {
                type: 12,
                data: $
            },
            {
                type: 12,
                data: l
            },
            ...N(r[0].dims, y.dims, x)
        ], S = (T)=>{
            let A = E("data", r[0].dataType, r[0].dims.length), k = E("slice_offsets", 12, y.dims.length), P = M("output", r[0].dataType, x.length);
            return "\n          ".concat(T.registerUniform("output_size", "u32").registerUniform("slice_size", "u32").declareVariables(A, k, P), "\n            ").concat(T.mainStart(), "\n            ").concat(T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];\n          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];\n        }");
        };
        e1.compute({
            name: "GatherND",
            shaderCache: {
                hint: t.cacheKey,
                inputDependencies: [
                    "rank",
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: x,
                            dataType: o
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil($ / 64)
                    },
                    programUniforms: v
                }),
            getShaderSource: S
        }, {
            inputs: [
                r[0],
                y
            ]
        });
    }, Td = (e1)=>({
            batchDims: e1.batch_dims,
            cacheKey: ""
        });
});
var Mf, Rf, Cd, Ad, kd = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Mf = (e1, t)=>{
        if (e1.length < 3 || e1.length > 4) throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");
        let r = C.normalizeAxis(t.quantizeAxis, e1[0].dims.length), n = t.blockSize, o = e1[0], i = e1[2], a = e1.length === 4 ? e1[3] : void 0;
        if (i.dims.length !== o.dims.length || !o.dims.map((d, l)=>l === r ? Math.ceil(d / n) === i.dims[l] : d === i.dims[l]).reduce((d, l)=>d && l, !0)) throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");
        if (a) {
            if (a.dataType !== o.dataType) throw new Error("Zero point must have the same data type as the input tensor.");
            if (a.dims.length !== i.dims.length || !a.dims.map((d, l)=>d === i.dims[l]).reduce((d, l)=>d && l, !0)) throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.");
        }
    }, Rf = (e1, t)=>{
        let r = e1[0].dims, n = e1[1].dims, o = r.length, i = C.normalizeAxis(t.gatherAxis, o), a = C.normalizeAxis(t.quantizeAxis, o), d = r.slice(0);
        d.splice(i, 1, ...n);
        let l = C.size(d), p = e1[2].dataType, u = e1[0].dataType === 22, h = [
            {
                type: 12,
                data: l
            },
            {
                type: 12,
                data: a
            },
            {
                type: 12,
                data: i
            },
            {
                type: 12,
                data: t.blockSize
            },
            ...N(...e1.map((y, g)=>y.dims), d)
        ], _ = (y)=>{
            let g = E("data", e1[0].dataType, e1[0].dims.length), x = E("inputIndices", e1[1].dataType, e1[1].dims.length), $ = E("scales", e1[2].dataType, e1[2].dims.length), v = e1.length > 3 ? E("zeroPoint", e1[3].dataType, e1[3].dims.length) : void 0, S = M("output", p, d.length), T = [
                g,
                x,
                $
            ];
            v && T.push(v);
            let A = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "quantize_axis",
                    type: "u32"
                },
                {
                    name: "gather_axis",
                    type: "u32"
                },
                {
                    name: "block_size",
                    type: "u32"
                }
            ];
            return "\n        ".concat(y.registerUniforms(A).declareVariables(...T, S), "\n        ").concat(y.mainStart(), "\n        let output_indices = ").concat(S.offsetToIndices("global_idx"), ";\n        var indices_indices = ").concat(x.type.indices, "(0);\n        ").concat((()=>n.length > 1 ? "\n          for (var i: u32 = 0; i < ".concat(n.length, "; i++) {\n            let index = ").concat(S.indicesGet("output_indices", "uniforms.gather_axis + i"), ";\n            ").concat(x.indicesSet("indices_indices", "i", "index"), ";\n          }") : "indices_indices = ".concat(S.indicesGet("output_indices", "uniforms.gather_axis"), ";"))(), ";\n        var data_indices = ").concat(g.type.indices, "(0);\n        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {\n          let index = ").concat(S.indicesGet("output_indices", "i"), ";\n          ").concat(g.indicesSet("data_indices", "i", "index"), ";\n        }\n        var index_from_indices = ").concat(x.getByIndices("indices_indices"), ";\n        if (index_from_indices < 0) {\n          index_from_indices += ").concat(r[i], ";\n        }\n        ").concat(g.indicesSet("data_indices", "uniforms.gather_axis", "u32(index_from_indices)"), ";\n        for (var i = uniforms.gather_axis + 1; i < ").concat(d.length, "; i++) {\n          let index = ").concat(S.indicesGet("output_indices", "i + ".concat(n.length, " - 1")), ";\n          ").concat(g.indicesSet("data_indices", "i", "index"), ";\n        }\n        let data_offset = ").concat(g.indicesToOffset("data_indices"), ";\n        let data_index = data_offset % 8;\n        // Convert 4-bit packed data to 8-bit packed data.\n        let packed_4bit_quantized_data = ").concat(g.getByOffset("data_offset / 8"), ";\n        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;\n        let quantized_data_vec = ").concat(u ? "unpack4xI8" : "unpack4xU8", "(u32(packed_8bit_quantized_data));\n        let quantized_data = quantized_data_vec[data_index / 2];\n        var scale_indices = data_indices;\n        let quantize_axis_index = ").concat($.indicesGet("data_indices", "uniforms.quantize_axis"), " / uniforms.block_size;\n        ").concat($.indicesSet("scale_indices", "uniforms.quantize_axis", "quantize_axis_index"), ";\n        var scale = ").concat($.getByIndices("scale_indices"), ";\n        ").concat((()=>v ? "\n              let zero_point_indices = scale_indices;\n              let zero_point_offset = ".concat(v.indicesToOffset("zero_point_indices"), ";\n              let zero_point_index = zero_point_offset % 8;\n              let packed_4bit_zero_points = ").concat(v.getByOffset("zero_point_offset / 8"), ";\n              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;\n              let zero_point_vec = ").concat(u ? "unpack4xI8" : "unpack4xU8", "(u32(packed_8bit_zero_points));\n              let zero_point = zero_point_vec[zero_point_index / 2];") : "var zero_point = 0")(), ";\n        let dequantized_data = ").concat(Ee(p), "(quantized_data - zero_point) * scale;\n        ").concat(S.setByOffset("global_idx", "dequantized_data"), ";\n    }");
        };
        return {
            name: "GatherBlockQuantized",
            shaderCache: {
                hint: "".concat(t.cacheKey, ";").concat(e1.filter((y, g)=>g !== 1).map((y)=>y.dims.join("_")).join(";")),
                inputDependencies: Array.from({
                    length: e1.length
                }, (y, g)=>"rank")
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: d,
                            dataType: p
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(l / 64)
                    },
                    programUniforms: h
                }),
            getShaderSource: _
        };
    }, Cd = (e1, t)=>{
        let r = e1.inputs;
        Mf(r, t), e1.compute(Rf(e1.inputs, t));
    }, Ad = (e1)=>re({
            blockSize: e1.blockSize,
            gatherAxis: e1.gatherAxis,
            quantizeAxis: e1.quantizeAxis
        });
});
var Uf, Nf, Ed, Pd, zd = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Uf = (e1)=>{
        if (!e1 || e1.length !== 2) throw new Error("GatherElements requires 2 inputs.");
        if (e1[0].dims.length < 1) throw new Error("GatherElements requires that the data input be rank >= 1.");
        if (e1[0].dims.length !== e1[1].dims.length) throw new Error("GatherElements requires that the data input and\n                     indices input tensors be of same rank.");
    }, Nf = (e1, t)=>{
        let r = e1[0].dims, n = e1[0].dataType, o = r.length, i = e1[1].dims, a = e1[1].dataType, d = C.normalizeAxis(t.axis, o), l = r[d], p = i.slice(0), m = C.size(p), u = E("input", n, o), h = E("indicesInput", a, i.length), _ = M("output", n, p.length), y = [
            {
                type: 12,
                data: m
            },
            {
                type: 6,
                data: l
            },
            {
                type: 12,
                data: d
            }
        ];
        return y.push(...N(r, i, p)), {
            name: "GatherElements",
            shaderCache: {
                inputDependencies: [
                    "rank",
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: p,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(m / 64)
                    },
                    programUniforms: y
                }),
            getShaderSource: ($)=>"\n      ".concat($.registerUniform("outputSize", "u32").registerUniform("axisDimLimit", "i32").registerUniform("axis", "u32").declareVariables(u, h, _), "\n      ").concat($.mainStart(), "\n      ").concat($.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n\n      let outputIndices = ").concat(_.offsetToIndices("global_idx"), ";\n\n      var idx = ").concat(h.getByOffset("global_idx"), ";\n      if (idx < 0) {\n        idx = idx + uniforms.axisDimLimit;\n      }\n      var inputIndices = ").concat(u.type.indices, "(outputIndices);\n      ").concat(u.indicesSet("inputIndices", "uniforms.axis", "u32(idx)"), ";\n      let value = ").concat(u.getByIndices("inputIndices"), ";\n\n      ").concat(_.setByOffset("global_idx", "value"), ";\n  }")
        };
    }, Ed = (e1)=>re({
            axis: e1.axis
        }), Pd = (e1, t)=>{
        let r = e1.inputs;
        Uf(r), e1.compute(Nf(e1.inputs, t));
    };
});
var Vf, Wf, Od, Dd, Bd = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    Vf = (e1)=>{
        if (!e1) throw new Error("Input is missing");
        if (e1.length < 2 || e1.length > 3) throw new Error("Invaid input number.");
        if (e1.length === 3 && e1[2].dims.length > 2) throw new Error("Invalid input shape of C");
        if (e1[0].dataType !== e1[1].dataType || e1.length === 3 && e1[0].dataType !== e1[2].dataType) throw new Error("Input types are mismatched");
    }, Wf = (e1, t)=>{
        let r = e1[0].dims.slice(), n = e1[1].dims.slice(), [o, i, a] = Vr.getShapeOfGemmResult(r, t.transA, n, t.transB, e1.length === 3 ? e1[2].dims : void 0), d = [
            o,
            i
        ];
        if (!d) throw new Error("Can't use gemm on the given tensors");
        let l = 16, p = Math.ceil(i / l), m = Math.ceil(o / l), u = !0, h = C.size(d), _ = [
            {
                type: 12,
                data: u ? p : h
            },
            {
                type: 12,
                data: o
            },
            {
                type: 12,
                data: i
            },
            {
                type: 12,
                data: a
            },
            {
                type: 1,
                data: t.alpha
            },
            {
                type: 1,
                data: t.beta
            }
        ], y = [
            "type",
            "type"
        ];
        e1.length === 3 && (_.push(...N(e1[2].dims)), y.push("rank")), _.push(...N(d));
        let g = ($)=>{
            let v = "";
            t.transA && t.transB ? v = "value += a[k * uniforms.M + m] * b[n * uniforms.K + k];" : t.transA && !t.transB ? v = "value += a[k * uniforms.M + m] * b[k * uniforms.N + n];" : !t.transA && t.transB ? v = "value += a[m * uniforms.K + k] * b[n * uniforms.K + k];" : !t.transA && !t.transB && (v = "value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");
            let S = t.alpha === 1 ? "" : "value *= uniforms.alpha;", T = E("a", e1[0].dataType, e1[0].dims), A = E("b", e1[1].dataType, e1[1].dims), k = T.type.value, P = null, D = [
                T,
                A
            ];
            e1.length === 3 && (P = E("c", e1[2].dataType, e1[2].dims.length), D.push(P));
            let R = M("output", e1[0].dataType, d.length);
            D.push(R);
            let G = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "M",
                    type: "u32"
                },
                {
                    name: "N",
                    type: "u32"
                },
                {
                    name: "K",
                    type: "u32"
                },
                {
                    name: "alpha",
                    type: "f32"
                },
                {
                    name: "beta",
                    type: "f32"
                }
            ];
            return "\n  ".concat($.registerUniforms(G).declareVariables(...D), "\n\n  ").concat($.mainStart(), "\n    ").concat($.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n\n    let m = global_idx / uniforms.N;\n    let n = global_idx % uniforms.N;\n\n    var value = ").concat(k, "(0);\n    for (var k: u32 = 0u; k < uniforms.K; k++) {\n      ").concat(v, "\n    }\n\n    ").concat(S, "\n    ").concat((()=>P != null ? "let cOffset = ".concat(P.broadcastedIndicesToOffset("vec2(m, n)", R), "; value += ").concat(k, "(uniforms.beta) * ").concat(P.getByOffset("cOffset"), ";") : "")(), "\n    output[global_idx] = value;\n  }");
        }, x = ($)=>{
            let v = E("a", e1[0].dataType, e1[0].dims), S = E("b", e1[1].dataType, e1[1].dims), T = null, A = [
                v,
                S
            ];
            e1.length === 3 && (T = E("c", e1[2].dataType, e1[2].dims.length), A.push(T));
            let k = M("output", e1[0].dataType, d.length);
            A.push(k);
            let P = [
                {
                    name: "num_tile_n",
                    type: "u32"
                },
                {
                    name: "M",
                    type: "u32"
                },
                {
                    name: "N",
                    type: "u32"
                },
                {
                    name: "K",
                    type: "u32"
                },
                {
                    name: "alpha",
                    type: "f32"
                },
                {
                    name: "beta",
                    type: "f32"
                }
            ], D = "", R = "";
            t.transA && t.transB ? (R = "\n      var col = tile_row_start + local_id.x;\n      var row = k_start + local_id.y;\n      if (col < uniforms.M && row < uniforms.K) {\n        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];\n      } else {\n        tile_a[local_id.y][local_id.x] = ".concat(v.type.value, "(0);\n      }\n\n      col = k_start + local_id.x;\n      row = tile_col_start + local_id.y;\n      if (col < uniforms.K && row < uniforms.N) {\n        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];\n      } else {\n        tile_b[local_id.y][local_id.x] = ").concat(S.type.value, "(0);\n      }\n      "), D = "value += tile_a[k][local_id.y] * tile_b[local_id.x][k];") : t.transA && !t.transB ? (R = "\n      var col = tile_row_start + local_id.x;\n      var row = k_start + local_id.y;\n      if (col < uniforms.M && row < uniforms.K) {\n        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];\n      } else {\n        tile_a[local_id.y][local_id.x] = ".concat(v.type.value, "(0);\n      }\n\n      col = tile_col_start + local_id.x;\n      row = k_start + local_id.y;\n      if (col < uniforms.N && row < uniforms.K) {\n        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];\n      } else {\n        tile_b[local_id.y][local_id.x] = ").concat(S.type.value, "(0);\n      }\n      "), D = "value += tile_a[k][local_id.y] * tile_b[k][local_id.x];") : !t.transA && t.transB ? (R = "\n      var col = k_start + local_id.x;\n      var row = tile_row_start + local_id.y;\n      if (col < uniforms.K && row < uniforms.M) {\n        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];\n      } else {\n        tile_a[local_id.y][local_id.x] = ".concat(v.type.value, "(0);\n      }\n\n      col = k_start + local_id.x;\n      row = tile_col_start + local_id.y;\n      if (col < uniforms.K && row < uniforms.N) {\n        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];\n      } else {\n        tile_b[local_id.y][local_id.x] = ").concat(S.type.value, "(0);\n      }\n      "), D = "value += tile_a[local_id.y][k] * tile_b[local_id.x][k];") : !t.transA && !t.transB && (R = "\n      var col = k_start + local_id.x;\n      var row = tile_row_start + local_id.y;\n      if (col < uniforms.K && row < uniforms.M) {\n        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];\n      } else {\n        tile_a[local_id.y][local_id.x] = ".concat(v.type.value, "(0);\n      }\n\n      col = tile_col_start + local_id.x;\n      row = k_start + local_id.y;\n      if (col < uniforms.N && row < uniforms.K) {\n        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];\n      } else {\n        tile_b[local_id.y][local_id.x] = ").concat(S.type.value, "(0);\n      }\n      "), D = "value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");
            let G = t.alpha === 1 ? "" : "value *= uniforms.alpha;";
            return "\n  ".concat($.registerUniforms(P).declareVariables(...A), "\n  var<workgroup> tile_a: array<array<").concat(v.type.storage, ", ").concat(l, ">, ").concat(l, ">;\n  var<workgroup> tile_b: array<array<").concat(S.type.storage, ", ").concat(l, ">, ").concat(l, ">;\n  ").concat($.mainStart([
                l,
                l,
                1
            ]), "\n    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ").concat(l, ";\n    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ").concat(l, ";\n    let num_tiles = (uniforms.K - 1) / ").concat(l, " + 1;\n    var k_start = 0u;\n    var value = ").concat(k.type.value, "(0);\n    for (var t: u32 = 0u; t < num_tiles; t++) {\n      ").concat(R, "\n      k_start = k_start + ").concat(l, ";\n      workgroupBarrier();\n\n      for (var k: u32 = 0u; k < ").concat(l, "; k++) {\n        ").concat(D, "\n      }\n      workgroupBarrier();\n    }\n\n    ").concat(G, "\n    let m = tile_row_start + local_id.y;\n    let n = tile_col_start + local_id.x;\n    ").concat((()=>T != null ? "let cOffset = ".concat(T.broadcastedIndicesToOffset("vec2(m, n)", k), "; value += ").concat(k.type.value, "(uniforms.beta) * ").concat(T.getByOffset("cOffset"), ";") : "")(), "\n    if (m < uniforms.M && n < uniforms.N) {\n      output[m * uniforms.N + n] = value;\n    }\n  }");
        };
        return u ? {
            name: "GemmShared",
            shaderCache: {
                hint: "".concat(t.cacheKey),
                inputDependencies: y
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: d,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: p * m
                    },
                    programUniforms: _
                }),
            getShaderSource: x
        } : {
            name: "Gemm",
            shaderCache: {
                hint: "".concat(t.cacheKey),
                inputDependencies: y
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: d,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(h / 64)
                    },
                    programUniforms: _
                }),
            getShaderSource: g
        };
    }, Od = (e1)=>{
        let t = e1.transA, r = e1.transB, n = e1.alpha, o = e1.beta;
        return {
            transA: t,
            transB: r,
            alpha: n,
            beta: o,
            cacheKey: "".concat(e1.transA, ";").concat(e1.transB, ";").concat(e1.alpha === 1)
        };
    }, Dd = (e1, t)=>{
        Vf(e1.inputs), e1.compute(Wf(e1.inputs, t));
    };
});
var lt, _t, Ut, Nt, Lf, Gf, Hf, Ff, qf, Kf, jf, Yf, Md, Rd, Ud = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    [lt, _t, Ut, Nt] = [
        0,
        1,
        2,
        3
    ], Lf = (e1)=>{
        if (e1[0].dims.length !== 4) throw new Error("only 4-D tensor is supported.");
        if (e1[0].dims.length !== e1[1].dims.length) throw new Error("input dimensions must be equal to grid dimensions");
        if (e1[0].dims.length - 2 !== e1[1].dims[e1[1].dims.length - 1]) throw new Error("last dimension of grid must be equal to ".concat(e1[0].dims.length - 2));
        if (e1[0].dims[0] !== e1[1].dims[0]) throw new Error("grid batch size must match input batch size");
    }, Gf = "\n  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {\n    let cubic_alpha = -0.75f;\n    let x_abs = abs(x);\n    var coeffs: vec4<f32>;\n    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);\n    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);\n    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);\n    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);\n    return coeffs;\n  }\n", Hf = (e1)=>"\n  fn gs_bicubic_interpolate(p: mat4x4<".concat(e1, ">, x: f32, y: f32) -> ").concat(e1, " {\n    var v: vec4<f32>;\n    var coeffs = gs_get_cubic_coeffs(x);\n    for (var i = 0; i < 4; i++) {\n      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];\n    }\n    coeffs = gs_get_cubic_coeffs(y);\n    let pixel = ").concat(e1, "(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);\n    return pixel;\n  }\n"), Ff = (e1)=>"\n  fn gs_denormalize(n: f32, length: i32) -> f32 {\n    ".concat(e1.alignCorners === 0 ? "\n    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]\n    return ((n + 1.0) * f32(length) - 1.0) / 2.0;\n    " : "\n    // alignCorners: true => [-1, 1] to [0, length - 1]\n    return (n + 1.0) / 2.0 * (f32(length - 1));\n    ", "\n  }\n"), qf = (e1)=>"\n  ".concat(e1.paddingMode === "reflection" ? "\n      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {\n        var dx = 0.0;\n        var fx = f32(x);\n        let range = x_max - x_min;\n        if (fx < x_min) {\n          dx = x_min - fx;\n          let n = u32(dx / range);\n          let r = dx - f32(n) * range;\n          if (n % 2 == 0) {\n            fx = x_min + r;\n          } else {\n            fx = x_max - r;\n          }\n        } else if (fx > x_max) {\n          dx = fx - x_max;\n          let n = u32(dx / range);\n          let r = dx - f32(n) * range;\n          if (n % 2 == 0) {\n            fx = x_max - r;\n          } else {\n            fx = x_min + r;\n          }\n        }\n        return u32(fx);\n      }" : "", "\n"), Kf = (e1, t, r)=>"\n  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ".concat(t, " {\n     var pixel = ").concat(t, "(0);\n     var indices = vec4<u32>(0);\n     indices[").concat(lt, "] = batch;\n     indices[").concat(_t, "] = channel;") + (()=>{
            switch(r.paddingMode){
                case "zeros":
                    return "\n          if (r >= 0 && r < H && c >=0 && c < W) {\n            indices[".concat(Ut, "] = u32(r);\n            indices[").concat(Nt, "] = u32(c);\n          }\n        ");
                case "border":
                    return "\n          indices[".concat(Ut, "] = u32(clamp(r, 0, H - 1));\n          indices[").concat(Nt, "] = u32(clamp(c, 0, W - 1));\n        ");
                case "reflection":
                    return "\n          indices[".concat(Ut, "] = gs_reflect(r, border[1], border[3]);\n          indices[").concat(Nt, "] = gs_reflect(c, border[0], border[2]);\n        ");
                default:
                    throw new Error("padding mode ".concat(r.paddingMode, " is not supported"));
            }
        })() + "\n    return ".concat(e1.getByIndices("indices"), ";\n  }\n"), jf = (e1, t, r)=>(()=>{
            switch(r.mode){
                case "nearest":
                    return "\n          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[".concat(lt, "], indices[").concat(_t, "], border);\n        ");
                case "bilinear":
                    return "\n          let x1 = i32(floor(x));\n          let y1 = i32(floor(y));\n          let x2 = x1 + 1;\n          let y2 = y1 + 1;\n\n          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[".concat(lt, "], indices[").concat(_t, "], border);\n          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[").concat(lt, "], indices[").concat(_t, "], border);\n          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[").concat(lt, "], indices[").concat(_t, "], border);\n          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[").concat(lt, "], indices[").concat(_t, "], border);\n\n          let dx2 = ").concat(t, "(f32(x2) - x);\n          let dx1 = ").concat(t, "(x - f32(x1));\n          let dy2 = ").concat(t, "(f32(y2) - y);\n          let dy1 = ").concat(t, "(y - f32(y1));\n          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);\n        ");
                case "bicubic":
                    return "\n          let x0 = i32(floor(x)) - 1;\n          let y0 = i32(floor(y)) - 1;\n          var p: mat4x4<".concat(t, ">;\n          for (var h = 0; h < 4; h++) {\n            for (var w = 0; w < 4; w++) {\n              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[").concat(lt, "], indices[").concat(_t, "], border);\n            }\n          }\n\n          let dx = x - f32(x0 + 1);\n          let dy = y - f32(y0 + 1);\n          let result = gs_bicubic_interpolate(p, dx, dy);\n        ");
                default:
                    throw new Error("mode ".concat(r.mode, " is not supported"));
            }
        })() + "".concat(e1.setByOffset("global_idx", "result")), Yf = (e1, t)=>{
        let r = E("x", e1[0].dataType, e1[0].dims.length), n = [
            e1[1].dims[0],
            e1[1].dims[1],
            e1[1].dims[2]
        ], o = E("grid", e1[1].dataType, n.length, 2), i = [
            e1[0].dims[0],
            e1[0].dims[1],
            e1[1].dims[1],
            e1[1].dims[2]
        ];
        t.format === "NHWC" && (i = [
            e1[0].dims[0],
            e1[1].dims[1],
            e1[1].dims[2],
            e1[0].dims[3]
        ], [lt, _t, Ut, Nt] = [
            0,
            3,
            1,
            2
        ]);
        let a = M("output", e1[0].dataType, i.length), d = r.type.value, l = C.size(i), p = [
            {
                type: 12,
                data: l
            },
            ...N(e1[0].dims, n, i)
        ], m = (u)=>"\n  ".concat(u.registerUniform("output_size", "u32").declareVariables(r, o, a), "\n  ").concat(Gf, "\n  ").concat(Hf(d), "\n  ").concat(Ff(t), "\n  ").concat(qf(t), "\n  ").concat(Kf(r, d, t), "\n\n  ").concat(u.mainStart(), "\n    ").concat(u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n      let H_in = i32(uniforms.x_shape[").concat(Ut, "]);\n      let W_in = i32(uniforms.x_shape[").concat(Nt, "]);\n\n      ").concat(t.alignCorners === 0 ? "\n      let x_min = -0.5;\n      let x_max = f32(W_in) - 0.5;\n      let y_min = -0.5;\n      let y_max = f32(H_in) - 0.5;\n      " : "\n      let x_min = 0.0;\n      let x_max = f32(W_in) - 1.0;\n      let y_min = 0.0;\n      let y_max = f32(H_in) - 1.0;\n      ", ";\n      let border = vec4<f32>(x_min, y_min, x_max, y_max);\n\n      let indices = ").concat(a.offsetToIndices("global_idx"), ";\n      var grid_indices = vec3<u32>(indices[").concat(lt, "], indices[").concat(Ut, "], indices[").concat(Nt, "]);\n      let nxy = ").concat(o.getByIndices("grid_indices"), ";\n      var x = gs_denormalize(f32(nxy[0]), W_in);\n      var y = gs_denormalize(f32(nxy[1]), H_in);\n\n      ").concat(jf(a, d, t), "\n  }");
        return {
            name: "GridSample",
            shaderCache: {
                hint: "".concat(t.cacheKey),
                inputDependencies: [
                    "type",
                    "type"
                ]
            },
            getRunData: (u)=>{
                let h = C.size(i);
                return {
                    outputs: [
                        {
                            dims: i,
                            dataType: u[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(h / 64)
                    },
                    programUniforms: p
                };
            },
            getShaderSource: m
        };
    }, Md = (e1, t)=>{
        Lf(e1.inputs), e1.compute(Yf(e1.inputs, t));
    }, Rd = (e1)=>re({
            alignCorners: e1.align_corners,
            mode: e1.mode,
            paddingMode: e1.padding_mode,
            format: e1.format
        });
});
var Be, Xf, Vd, Nd, Jf, tr, Wd, So = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    Nr();
    Fr();
    ae();
    dt();
    Be = (e1, t)=>e1.length > t && e1[t].dims.length > 0 ? e1[t] : void 0, Xf = (e1, t)=>{
        let r = e1[0], n = Be(e1, 1), o = Be(e1, 2), i = Be(e1, 3), a = Be(e1, 4), d = Be(e1, 5), l = Be(e1, 6), p = Be(e1, 7);
        if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
        let m = r.dims[0], u = r.dims[1], h = r.dims.length === 3 ? r.dims[2] : t.numHeads * r.dims[4], _ = u, y = 0, g = 0, x = Math.floor(h / t.numHeads);
        if (l && p && C.size(l.dims) && C.size(p.dims)) {
            if (l.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions');
            if (l.dims[0] !== m || l.dims[1] !== t.numHeads || l.dims[3] !== x) throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');
            if (p.dims[0] !== m || p.dims[1] !== t.numHeads || p.dims[3] !== x) throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');
            if (l.dims[2] !== p.dims[2]) throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');
            if (p.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions');
            y = l.dims[2], g = l.dims[2];
        } else if (l && C.size(l.dims) || p && C.size(p.dims)) throw new Error('Input "past_key" and "past_value" shall be both present or both absent');
        let $;
        if (n && C.size(n.dims) > 0) {
            if (r.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given');
            if (n.dims.length < 3 || n.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');
            if (r.dims[0] !== n.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');
            if (n.dims.length === 3) {
                if (n.dims[2] !== r.dims[2]) throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');
                $ = 2, _ = n.dims[1];
            } else if (n.dims.length === 5) {
                if (n.dims[2] !== t.numHeads || n.dims[3] !== 2 || n.dims[4] !== x) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');
                if (o) throw new Error('Expect "value" be none when "key" has packed kv format.');
                $ = 5, _ = n.dims[1];
            } else {
                if (n.dims[1] !== t.numHeads || n.dims[3] !== x) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');
                $ = 0, _ = n.dims[2];
            }
        } else {
            if (r.dims.length !== 5) throw new Error('Input "query" is expected to have 5 dimensions when key is empty');
            if (r.dims[2] !== t.numHeads || r.dims[3] !== 3) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');
            $ = 3;
        }
        if (i && C.size(i.dims) > 0) {
            if (i.dims.length !== 1) throw new Error('Input "bias" is expected to have 1 dimension');
            if (n && n.dims.length === 5 && n.dims[3] === 2) throw new Error("bias is not allowed for packed kv.");
        }
        let v = y + _, S = 0;
        if (a && C.size(a.dims) > 0) {
            S = 8;
            let P = a.dims;
            throw P.length === 1 ? P[0] === m ? S = 1 : P[0] === 3 * m + 2 && (S = 3) : P.length === 2 && P[0] === m && P[1] === v && (S = 5), S === 8 ? new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)') : new Error("Mask not supported");
        }
        let T = !1, A = h;
        if (o && C.size(o.dims) > 0) {
            if (o.dims.length !== 3 && o.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions');
            if (r.dims[0] !== o.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');
            if (o.dims.length === 3) {
                if (_ !== o.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');
                A = o.dims[2];
            } else {
                if (_ !== o.dims[2]) throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');
                A = o.dims[1] * o.dims[3], T = !0;
            }
        }
        let k = !1;
        if (a && C.size(a.dims) > 0) throw new Error("Key padding mask is not supported");
        if (d && C.size(d.dims) > 0) {
            if (d.dims.length !== 4) throw new Error('Input "attention_bias" is expected to have 4 dimensions');
            if (d.dims[0] !== m || d.dims[1] !== t.numHeads || d.dims[2] !== u || d.dims[3] !== v) throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)');
        }
        return {
            batchSize: m,
            sequenceLength: u,
            pastSequenceLength: y,
            kvSequenceLength: _,
            totalSequenceLength: v,
            maxSequenceLength: g,
            inputHiddenSize: 0,
            hiddenSize: h,
            vHiddenSize: A,
            headSize: x,
            vHeadSize: Math.floor(A / t.numHeads),
            numHeads: t.numHeads,
            isUnidirectional: !1,
            pastPresentShareBuffer: !1,
            maskFilterValue: t.maskFilterValue,
            maskType: S,
            scale: t.scale,
            broadcastResPosBias: k,
            passPastInKv: T,
            qkvFormat: $
        };
    }, Vd = (e1)=>re({
            ...e1
        }), Nd = re({
        perm: [
            0,
            2,
            1,
            3
        ]
    }), Jf = (e1, t, r, n, o, i, a)=>{
        let d = [
            n,
            o,
            i
        ], l = C.size(d), p = [
            {
                type: 12,
                data: l
            },
            {
                type: 12,
                data: a
            },
            {
                type: 12,
                data: i
            }
        ], m = (u)=>{
            let h = M("qkv_with_bias", t.dataType, d), _ = E("qkv", t.dataType, d), y = E("bias", r.dataType, d), g = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "bias_offset",
                    type: "u32"
                },
                {
                    name: "hidden_size",
                    type: "u32"
                }
            ];
            return "\n  ".concat(u.registerUniforms(g).declareVariables(_, y, h), "\n  ").concat(u.mainStart(), "\n    ").concat(u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;\n\n    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];\n  }");
        };
        return e1.compute({
            name: "MultiHeadAttentionAddBias",
            shaderCache: {
                inputDependencies: [
                    "type",
                    "type"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: d,
                            dataType: t.dataType,
                            gpuDataType: 0
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(l / 64)
                    },
                    programUniforms: p
                }),
            getShaderSource: m
        }, {
            inputs: [
                t,
                r
            ],
            outputs: [
                -1
            ]
        })[0];
    }, tr = (e1, t, r, n, o, i, a, d)=>{
        let l = i;
        if (a && C.size(a.dims) > 0) {
            if (n === 1) throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");
            return l = Jf(e1, i, a, t, n, r * o, d), l = l.reshape([
                t,
                n,
                r,
                o
            ]), r === 1 || n === 1 ? l : e1.compute(Pe(l, Nd.perm), {
                inputs: [
                    l
                ],
                outputs: [
                    -1
                ]
            })[0];
        } else return i.dims.length === 3 && (l = i.reshape([
            t,
            n,
            r,
            o
        ])), r === 1 || n === 1 ? l : e1.compute(Pe(l, Nd.perm), {
            inputs: [
                l
            ],
            outputs: [
                -1
            ]
        })[0];
    }, Wd = (e1, t)=>{
        let r = Xf(e1.inputs, t), n = e1.inputs[0], o = Be(e1.inputs, 1), i = Be(e1.inputs, 2), a = Be(e1.inputs, 3), d = Be(e1.inputs, 4), l = Be(e1.inputs, 5), p = Be(e1.inputs, 6), m = Be(e1.inputs, 7);
        if (n.dims.length === 5) throw new Error("Packed QKV is not implemented");
        if ((o === null || o === void 0 ? void 0 : o.dims.length) === 5) throw new Error("Packed KV is not implemented");
        let u = o && i && o.dims.length === 4 && i.dims.length === 4, h = tr(e1, r.batchSize, r.numHeads, r.sequenceLength, r.headSize, n, a, 0);
        if (u) return Rt(e1, h, o, i, d, void 0, p, m, l, r);
        if (!o || !i) throw new Error("key and value must be provided");
        let _ = tr(e1, r.batchSize, r.numHeads, r.kvSequenceLength, r.headSize, o, a, r.hiddenSize), y = tr(e1, r.batchSize, r.numHeads, r.kvSequenceLength, r.vHeadSize, i, a, 2 * r.hiddenSize);
        Rt(e1, h, _, y, d, void 0, p, m, l, r);
    };
});
var eh, th, rh, nh, To, Ld, Gd, Io = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    eh = (e1)=>{
        if (!e1 || e1.length < 1) throw new Error("too few inputs");
    }, th = (e1, t)=>{
        let r = [], n = t.numOutputs;
        return e1[1].dims[0] > 0 && (e1[1].getBigInt64Array().forEach((o)=>r.push(Number(o))), n = r.length), re({
            numOutputs: n,
            axis: t.axis,
            splitSizes: r
        });
    }, rh = (e1)=>"\nfn calculateOutputIndex(index: u32) -> u32 {\n    for (var i: u32 = 0u; i < ".concat(e1, "u; i += 1u ) {\n    if (index < ").concat(F("uniforms.size_in_split_axis", "i", e1), ") {\n        return i;\n    }\n    }\n    return ").concat(e1, "u;\n}"), nh = (e1)=>{
        let t = e1.length, r = [];
        for(let n = 0; n < t; ++n){
            let o = e1[n].setByIndices("indices", "input[global_idx]");
            t === 1 ? r.push(o) : n === 0 ? r.push("if (output_number == ".concat(n, "u) { ").concat(o, " }")) : n === t - 1 ? r.push("else { ".concat(o, " }")) : r.push("else if (output_number == ".concat(n, ") { ").concat(o, " }"));
        }
        return "\n      fn writeBufferData(output_number: u32, indices: ".concat(e1[0].type.indices, ", global_idx: u32) {\n        ").concat(r.join("\n"), "\n      }");
    }, To = (e1, t)=>{
        let r = e1[0].dims, n = C.size(r), o = e1[0].dataType, i = C.normalizeAxis(t.axis, r.length), a = new Array(t.numOutputs), d = E("input", o, r.length), l = new Array(t.numOutputs), p = [], m = [], u = 0, h = [
            {
                type: 12,
                data: n
            }
        ];
        for(let y = 0; y < t.numOutputs; y++){
            u += t.splitSizes[y], l[y] = u;
            let g = r.slice();
            g[i] = t.splitSizes[y], m.push(g), a[y] = M("output".concat(y), o, g.length), p.push({
                dims: m[y],
                dataType: e1[0].dataType
            });
        }
        h.push({
            type: 12,
            data: l
        }, ...N(r, ...m));
        let _ = (y)=>"\n  ".concat(y.registerUniform("input_size", "u32").registerUniform("size_in_split_axis", "u32", l.length).declareVariables(d, ...a), "\n  ").concat(rh(l.length), "\n  ").concat(nh(a), "\n\n  ").concat(y.mainStart(), "\n    ").concat(y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size"), "\n\n    var indices = ").concat(d.offsetToIndices("global_idx"), ";\n    var index = ").concat(d.indicesGet("indices", i), ";\n    let output_number = calculateOutputIndex(index);\n    if (output_number != 0) {\n      index -= ").concat(F("uniforms.size_in_split_axis", "output_number - 1u", l.length), ";\n      ").concat(d.indicesSet("indices", i, "index"), ";\n    }\n    writeBufferData(output_number, indices, global_idx);\n  }");
        return {
            name: "Split",
            shaderCache: {
                hint: t.cacheKey,
                inputDependencies: [
                    "rank"
                ]
            },
            getShaderSource: _,
            getRunData: ()=>({
                    outputs: p,
                    dispatchGroup: {
                        x: Math.ceil(n / 64)
                    },
                    programUniforms: h
                })
        };
    }, Ld = (e1, t)=>{
        eh(e1.inputs);
        let r = e1.inputs.length === 1 ? t : th(e1.inputs, t);
        e1.compute(To(e1.inputs, r), {
            inputs: [
                0
            ]
        });
    }, Gd = (e1)=>{
        let t = e1.axis, r = e1.splitSizes, n = e1.numOutputs < 0 ? r.length : e1.numOutputs;
        if (n !== r.length) throw new Error("numOutputs and splitSizes lengh must be equal");
        return re({
            axis: t,
            numOutputs: n,
            splitSizes: r
        });
    };
});
var oh, ih, Hd, Fd, qd = U(()=>{
    "use strict";
    Se();
    Fr();
    So();
    Io();
    dt();
    oh = (e1, t)=>{
        if (t.doRotary) throw new Error("GroupQuerryAttention do_rotary attribute is not supported");
        if (t.doRotary && e1.length <= 7) throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");
        let r = e1[0], n = e1[1], o = e1[2], i = e1[3], a = e1[4];
        if (t.localWindowSize !== -1) throw new Error("Local attention is not supported");
        if (t.softcap !== 0) throw new Error("Softcap is not supported");
        if (t.rotaryInterleaved !== 0) throw new Error("Rotary interleaved is not supported");
        if (t.smoothSoftmax) throw new Error("Smooth softmax is not supported");
        if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error("Input query is expected to have 3 or 5 dimensions");
        let d = !1, l = r.dims[0], p = r.dims[1], m = r.dims.length === 3 ? d ? r.dims[2] / 3 : r.dims[2] : t.numHeads * r.dims[4], u = p, h = 0, _ = !n || n.dims.length === 0, y = Math.floor(_ ? m / (t.numHeads + 2 * t.kvNumHeads) : m / t.numHeads);
        _ && (m = y * t.numHeads);
        let g = i && i.dims.length !== 0, x = a && a.dims.length !== 0;
        if (g && i.dims.length === 4 && i.dims[0] === l && i.dims[1] !== t.kvNumHeads && i.dims[2] === t.kvNumHeads && i.dims[3] === y) throw new Error("BSNH pastKey/pastValue is not supported");
        if (g && x) {
            if (i.dims.length !== 4) throw new Error('Input "past_key" is expected to have 4 dimensions');
            if (a.dims.length !== 4) throw new Error('Input "past_value" is expected to have 4 dimensions');
            h = i.dims[2];
        } else if (g || x) throw new Error('Input "past_key" and "past_value" shall be both present or both absent');
        let v = 1;
        if (n && n.dims.length > 0) {
            if (r.dims.length !== 3) throw new Error('Input "query" is expected to have 3 dimensions when key is given');
            if (n.dims.length < 3 || n.dims.length > 5) throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');
            if (r.dims[0] !== n.dims[0]) throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');
            if (n.dims.length === 3) {
                if (r.dims[2] % n.dims[2] !== 0) throw new Error('Dimension 2 of "query" should be a multiple of "key"');
                u = n.dims[1];
            } else if (n.dims.length === 5) {
                if (n.dims[2] !== t.numHeads || n.dims[3] !== 2 || n.dims[4] !== y) throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');
                if (o) throw new Error('Expect "value" be none when "key" has packed kv format.');
                u = n.dims[1];
            } else {
                if (n.dims[1] !== t.numHeads || n.dims[3] !== y) throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');
                u = n.dims[2];
            }
        } else {
            if (r.dims.length !== 3 && r.dims.length !== 5) throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');
            if (r.dims.length === 5 && (r.dims[2] !== t.numHeads || r.dims[3] !== 3)) throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');
            v = 3;
        }
        let S = 0, T = !1, A = t.kvNumHeads ? y * t.kvNumHeads : m;
        if (o && o.dims.length > 0) {
            if (o.dims.length !== 3 && o.dims.length !== 4) throw new Error('Input "value" is expected to have 3 or 4 dimensions');
            if (r.dims[0] !== o.dims[0]) throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');
            if (o.dims.length === 3) {
                if (u !== o.dims[1]) throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');
                A = o.dims[2];
            } else {
                if (u !== o.dims[2]) throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');
                A = o.dims[1] * o.dims[3], T = !0;
            }
        }
        let k = e1.length > 4 ? e1[5] : void 0;
        if (k && k.dims.length !== 1 && k.dims[0] !== l) throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');
        let P = -1, D = -1, R = !1;
        return {
            batchSize: l,
            sequenceLength: p,
            pastSequenceLength: h,
            kvSequenceLength: u,
            totalSequenceLength: P,
            maxSequenceLength: D,
            inputHiddenSize: 0,
            hiddenSize: m,
            vHiddenSize: A,
            headSize: y,
            vHeadSize: Math.floor(A / t.kvNumHeads),
            numHeads: t.numHeads,
            kvNumHeads: t.kvNumHeads,
            nReps: t.numHeads / t.kvNumHeads,
            pastPresentShareBuffer: !1,
            maskType: S,
            scale: t.scale,
            broadcastResPosBias: R,
            passPastInKv: T,
            qkvFormat: v
        };
    }, ih = re({
        perm: [
            0,
            2,
            1,
            3
        ]
    }), Hd = (e1, t, r)=>{
        let n = t, o = r.kvNumHeads;
        return t.dims.length === 3 && r.kvSequenceLength !== 0 && (n = t.reshape([
            r.batchSize,
            r.kvSequenceLength,
            o,
            r.headSize
        ]), n = e1.compute(Pe(n, ih.perm), {
            inputs: [
                n
            ],
            outputs: [
                -1
            ]
        })[0]), n;
    }, Fd = (e1, t)=>{
        var _e_inputs_;
        let r = oh(e1.inputs, t);
        if (e1.inputs[0].dims.length === 5) throw new Error("Packed QKV is not implemented");
        if (((_e_inputs_ = e1.inputs[1]) === null || _e_inputs_ === void 0 ? void 0 : _e_inputs_.dims.length) === 5) throw new Error("Packed KV is not implemented");
        let n = e1.inputs[0], o = e1.inputs[1] && e1.inputs[1].dims.length > 0 ? e1.inputs[1] : void 0, i = e1.inputs[2] && e1.inputs[2].dims.length > 0 ? e1.inputs[2] : void 0, a = e1.inputs[3] && e1.inputs[3].dims.length !== 0 ? e1.inputs[3] : void 0, d = e1.inputs[4] && e1.inputs[4].dims.length !== 0 ? e1.inputs[4] : void 0, l = e1.inputs.length > 4 ? e1.inputs[5] : void 0, p = e1.inputs.length > 5 ? e1.inputs[6] : void 0, m = r.kvNumHeads ? r.kvNumHeads : r.numHeads, u = re({
            axis: 2,
            numOutputs: 3,
            splitSizes: [
                r.numHeads * r.headSize,
                m * r.headSize,
                m * r.headSize
            ]
        }), [h, _, y] = !o && !i ? e1.compute(To([
            n
        ], u), {
            inputs: [
                n
            ],
            outputs: [
                -1,
                -1,
                -1
            ]
        }) : [
            n,
            o,
            i
        ], g = tr(e1, r.batchSize, r.numHeads, r.sequenceLength, r.headSize, h, void 0, 0);
        Rt(e1, g, Hd(e1, _, r), Hd(e1, y, r), void 0, void 0, a, d, void 0, r, l, p);
    };
});
var Kd, ah, sh, jd, Yd = U(()=>{
    "use strict";
    te();
    oe();
    dt();
    ae();
    Kd = (e1, t, r, n, o, i, a, d)=>{
        let l = me(i), p = l === 1 ? "f32" : "vec".concat(l, "f"), m = l === 1 ? "vec2f" : "mat2x".concat(l, "f"), u = o * a, h = 64;
        u === 1 && (h = 256);
        let _ = [
            o,
            a,
            i / l
        ], y = [
            o,
            a,
            2
        ], g = [
            "rank",
            "type",
            "type"
        ], x = [];
        x.push(...N(_, y));
        let $ = (v)=>{
            let S = E("x", t.dataType, 3, l), T = E("scale", r.dataType, r.dims), A = E("bias", n.dataType, n.dims), k = M("output", 1, 3, 2), P = [
                S,
                T,
                A,
                k
            ];
            return "\n  var<workgroup> workgroup_shared : array<".concat(m, ", ").concat(h, ">;\n  const workgroup_size = ").concat(h, "u;\n  ").concat(v.declareVariables(...P), "\n  ").concat(v.mainStart(h), "\n    let batch = workgroup_index / uniforms.x_shape[1];\n    let channel = workgroup_index % uniforms.x_shape[1];\n    let hight = uniforms.x_shape[2];\n    // initialize workgroup memory\n    var sum = ").concat(p, "(0);\n    var squared_sum = ").concat(p, "(0);\n    for (var h = local_idx; h < hight; h += workgroup_size) {\n      let value = ").concat(p, "(").concat(S.get("batch", "channel", "h"), ");\n      sum += value;\n      squared_sum += value * value;\n    }\n    workgroup_shared[local_idx] = ").concat(m, "(sum, squared_sum);\n    workgroupBarrier();\n\n    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {\n      if (local_idx < currSize) {\n        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];\n      }\n      workgroupBarrier();\n    }\n    if (local_idx == 0) {\n      let sum_final = ").concat(Fe("workgroup_shared[0][0]", l), " / f32(hight * ").concat(l, ");\n      let squared_sum_final = ").concat(Fe("workgroup_shared[0][1]", l), " / f32(hight * ").concat(l, ");\n\n      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(").concat(d, "));\n      let channel_scale = inv_std_dev * f32(scale[channel]);\n      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;\n      output[workgroup_index] = vec2f(channel_scale, channel_shift);\n    }\n  }");
        };
        return e1.compute({
            name: "InstanceNormComputeChannelScaleShift",
            shaderCache: {
                hint: "".concat(l, ";").concat(d, ";").concat(h),
                inputDependencies: g
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: y,
                            dataType: 1
                        }
                    ],
                    dispatchGroup: {
                        x: u
                    },
                    programUniforms: x
                }),
            getShaderSource: $
        }, {
            inputs: [
                t,
                r,
                n
            ],
            outputs: [
                -1
            ]
        })[0];
    }, ah = (e1, t, r)=>{
        let n = t[0].dims, o = n, i = 2, a = n[0], d = n[1], l = C.sizeFromDimension(n, i), p = me(l), m = C.size(o) / p, u = Kd(e1, t[0], t[1], t[2], a, l, d, r.epsilon), h = [
            a,
            d,
            l / p
        ], _ = [
            a,
            d
        ], y = [
            "type",
            "none"
        ], g = (x)=>{
            let $ = E("x", t[0].dataType, h.length, p), v = E("scale_shift", 1, _.length, 2), S = M("output", t[0].dataType, h.length, p), T = [
                $,
                v,
                S
            ];
            return "\n  ".concat(x.registerUniform("output_size", "u32").declareVariables(...T), "\n  ").concat(x.mainStart(), "\n  ").concat(x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n      let outputIndices = ").concat(S.offsetToIndices("global_idx"), ";\n      let batch = outputIndices[0];\n      let channel = outputIndices[1];\n      let scale_shift = ").concat(v.getByIndices("vec2<u32>(batch, channel)"), ";\n      let value = ").concat($.getByOffset("global_idx"), " * ").concat(S.type.value, "(scale_shift.x) + ").concat(S.type.value, "(scale_shift.y);\n      ").concat(S.setByOffset("global_idx", "value"), ";\n  }");
        };
        e1.compute({
            name: "InstanceNormalization",
            shaderCache: {
                hint: "".concat(p),
                inputDependencies: y
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: o,
                            dataType: t[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(m / 64)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: m
                        },
                        ...N(h, _, h)
                    ]
                }),
            getShaderSource: g
        }, {
            inputs: [
                t[0],
                u
            ]
        });
    }, sh = (e1, t, r)=>{
        let n = t[0].dims, o = n, i = n[0], a = n[n.length - 1], d = C.sizeFromDimension(n, 1) / a, l = me(a), p = C.size(o) / l, m = [
            {
                type: 12,
                data: d
            },
            {
                type: 12,
                data: Math.floor(a / l)
            }
        ], u = [
            "type",
            "type"
        ], h = !1, _ = [
            0,
            n.length - 1
        ];
        for(let $ = 0; $ < n.length - 2; $++)h = h || n[$ + 1] !== 1, _.push($ + 1);
        h = h && n[n.length - 1] !== 1;
        let y = h ? e1.compute(Pe(e1.inputs[0], _), {
            inputs: [
                e1.inputs[0]
            ],
            outputs: [
                -1
            ]
        })[0] : e1.inputs[0].reshape(Array.from({
            length: n.length
        }, ($, v)=>n[_[v]])), g = Kd(e1, y, t[1], t[2], i, d, a, r.epsilon), x = ($)=>{
            let v = _e(t[0].dataType), S = l === 1 ? "vec2f" : "mat".concat(l, "x2f"), T = (P)=>{
                let D = P === 0 ? "x" : "y", R = l === 1 ? "f32" : "vec".concat(l, "f");
                switch(l){
                    case 1:
                        return "".concat(v, "(").concat(R, "(scale.").concat(D, "))");
                    case 2:
                        return "vec2<".concat(v, ">(").concat(R, "(scale[0].").concat(D, ", scale[1].").concat(D, "))");
                    case 4:
                        return "vec4<".concat(v, ">(").concat(R, "(scale[0].").concat(D, ", scale[1].").concat(D, ", scale[2].").concat(D, ", scale[3].").concat(D, "))");
                    default:
                        throw new Error("Not supported compoents ".concat(l));
                }
            }, A = E("input", t[0].dataType, t[0].dims, l), k = M("output", t[0].dataType, o, l);
            return "\n  @group(0) @binding(0) var<storage, read> input : array<".concat(A.type.storage, ">;\n  @group(0) @binding(1) var<storage, read> scale_input : array<").concat(S, ">;\n  @group(0) @binding(2) var<storage, read_write> output : array<").concat(k.type.storage, ">;\n  struct Uniforms {H: u32, C : u32};\n  @group(0) @binding(3) var<uniform> uniforms: Uniforms;\n\n  ").concat($.mainStart(), "\n    let current_image_number = global_idx / (uniforms.C * uniforms.H);\n    let current_channel_number = global_idx % uniforms.C;\n\n    let scale_offset = current_image_number * uniforms.C + current_channel_number;\n    let scale = scale_input[scale_offset];\n    output[global_idx] = fma(input[global_idx], ").concat(T(0), ", ").concat(T(1), ");\n  }");
        };
        e1.compute({
            name: "InstanceNormalizationNHWC",
            shaderCache: {
                hint: "".concat(l),
                inputDependencies: u
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: o,
                            dataType: t[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(p / 64)
                    },
                    programUniforms: m
                }),
            getShaderSource: x
        }, {
            inputs: [
                t[0],
                g
            ]
        });
    }, jd = (e1, t)=>{
        t.format === "NHWC" ? sh(e1, e1.inputs, t) : ah(e1, e1.inputs, t);
    };
});
var uh, dh, Zd, Qd = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    uh = (e1)=>{
        if (!e1 || e1.length < 2) throw new Error("layerNorm requires at least 2 inputs.");
    }, dh = (e1, t, r)=>{
        let n = t.simplified, o = e1[0].dims, i = e1[1], a = !n && e1[2], d = o, l = C.normalizeAxis(t.axis, o.length), p = C.sizeToDimension(o, l), m = C.sizeFromDimension(o, l), u = C.size(i.dims), h = a ? C.size(a.dims) : 0;
        if (u !== m || a && h !== m) throw new Error("Size of X.shape()[axis:] == ".concat(m, ".\n       Size of scale and bias (if provided) must match this.\n       Got scale size of ").concat(u, " and bias size of ").concat(h));
        let _ = [];
        for(let A = 0; A < o.length; ++A)A < l ? _.push(o[A]) : _.push(1);
        let y = me(m), g = [
            "type",
            "type"
        ], x = [
            {
                type: 12,
                data: p
            },
            {
                type: 1,
                data: m
            },
            {
                type: 12,
                data: Math.floor(m / y)
            },
            {
                type: 1,
                data: t.epsilon
            }
        ];
        a && g.push("type");
        let $ = r > 1, v = r > 2, S = (A)=>{
            let k = _e(e1[0].dataType), P = [
                E("x", e1[0].dataType, e1[0].dims, y),
                E("scale", i.dataType, i.dims, y)
            ];
            a && P.push(E("bias", a.dataType, a.dims, y)), P.push(M("output", e1[0].dataType, d, y)), $ && P.push(M("mean_data_output", 1, _)), v && P.push(M("inv_std_output", 1, _));
            let D = [
                {
                    name: "norm_count",
                    type: "u32"
                },
                {
                    name: "norm_size",
                    type: "f32"
                },
                {
                    name: "norm_size_vectorized",
                    type: "u32"
                },
                {
                    name: "epsilon",
                    type: "f32"
                }
            ];
            return "\n  ".concat(A.registerUniforms(D).declareVariables(...P), "\n  ").concat(A.mainStart(), "\n    ").concat(A.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count"), "\n    let offset = global_idx * uniforms.norm_size_vectorized;\n    var mean_vector = ").concat(uo("f32", y), ";\n    var mean_square_vector = ").concat(uo("f32", y), ";\n\n    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {\n      let value = ").concat(Et(k, y, "x[h + offset]"), ";\n      mean_vector += value;\n      mean_square_vector += value * value;\n    }\n    let mean = ").concat(Fe("mean_vector", y), " / uniforms.norm_size;\n    let inv_std_dev = inverseSqrt(").concat(Fe("mean_square_vector", y), " / uniforms.norm_size ").concat(n ? "" : "- mean * mean", " + uniforms.epsilon);\n\n    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {\n      let f32input = ").concat(Et(k, y, "x[j + offset]"), ";\n      let f32scale = ").concat(Et(k, y, "scale[j]"), ";\n      output[j + offset] = ").concat(P[0].type.value, "((f32input ").concat(n ? "" : "- mean", ") * inv_std_dev * f32scale\n        ").concat(a ? "+ ".concat(Et(k, y, "bias[j]")) : "", "\n      );\n    }\n\n    ").concat($ ? "mean_data_output[global_idx] = mean" : "", ";\n    ").concat(v ? "inv_std_output[global_idx] = inv_std_dev" : "", ";\n  }");
        }, T = [
            {
                dims: d,
                dataType: e1[0].dataType
            }
        ];
        return $ && T.push({
            dims: _,
            dataType: 1
        }), v && T.push({
            dims: _,
            dataType: 1
        }), {
            name: "LayerNormalization",
            shaderCache: {
                hint: "".concat(y, ";").concat(r, ";").concat(n),
                inputDependencies: g
            },
            getRunData: ()=>({
                    outputs: T,
                    dispatchGroup: {
                        x: Math.ceil(p / 64)
                    },
                    programUniforms: x
                }),
            getShaderSource: S
        };
    }, Zd = (e1, t)=>{
        uh(e1.inputs), e1.compute(dh(e1.inputs, t, e1.outputCount));
    };
});
var lh, Xd, Jd = U(()=>{
    "use strict";
    oe();
    Qr();
    Xr();
    lh = (e1)=>{
        if (!e1 || e1.length !== 2) throw new Error("MatMul requires 2 inputs.");
        if (e1[0].dims[e1[0].dims.length - 1] !== e1[1].dims[e1[1].dims.length - 2]) throw new Error("shared dimension does not match.");
    }, Xd = (e1)=>{
        lh(e1.inputs);
        let t = tt.calcShape(e1.inputs[0].dims, e1.inputs[1].dims, !0);
        if (!t) throw new Error("Can't use matmul on the given tensors");
        let r = t[t.length - 1], n = e1.inputs[0].dims[e1.inputs[0].dims.length - 1];
        if (r < 8 && n < 8) e1.compute(Zr(e1.inputs, {
            activation: ""
        }, t));
        else {
            let o = t[t.length - 2], i = C.size(e1.inputs[0].dims.slice(0, -2)), a = C.size(e1.inputs[1].dims.slice(0, -2));
            if (i !== 1 && o === 1 && a === 1) {
                let d = e1.inputs[0].reshape([
                    1,
                    i,
                    n
                ]), l = e1.inputs[1].reshape([
                    1,
                    n,
                    r
                ]), p = [
                    1,
                    i,
                    r
                ], m = [
                    d,
                    l
                ];
                e1.compute(er(m, {
                    activation: ""
                }, t, p), {
                    inputs: m
                });
            } else e1.compute(er(e1.inputs, {
                activation: ""
            }, t));
        }
    };
});
var ch, ph, mh, el, tl, rl = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    ch = (e1, t)=>{
        if (e1.length < 3 || e1.length > 4) throw new Error("MatMulNBits requires 3 or 4 inputs");
        let r = e1[0], n = r.dims.length;
        if (r.dims[n - 1] !== t.k) throw new Error("The last dim of input shape does not match the k value");
        let o = Math.floor((t.k + t.blockSize - 1) / t.blockSize), i = t.blockSize / 8 * t.bits, a = e1[1];
        if (!C.areEqual(a.dims, [
            t.n,
            o,
            i
        ])) throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");
        let l = e1[2].dims;
        if (C.size(l) !== t.n * o) throw new Error("scales input size error.");
        if (e1.length === 4) {
            let m = e1[3].dims, u = t.bits > 4 ? t.n * o : t.n * Math.floor((o + 1) / 2);
            if (C.size(m) !== u) throw new Error("zeroPoints input size error.");
        }
    }, ph = (e1, t)=>{
        let r = e1[0].dims, n = r.length, o = r[n - 2], i = t.k, a = t.n, d = r.slice(0, n - 2), l = C.size(d), m = e1[1].dims[2] / 4, u = e1[0].dataType, h = me(t.k), _ = me(m), y = me(a), g = d.concat([
            o,
            a
        ]), x = o > 1 && a / y % 2 === 0 ? 2 : 1, $ = C.size(g) / y / x, v = 64, S = [], T = [
            l,
            o,
            i / h
        ], A = C.convertShape(e1[1].dims).slice();
        A.splice(-1, 1, m / _), S.push(...N(T)), S.push(...N(A)), S.push(...N(e1[2].dims)), e1.length === 4 && S.push(...N(C.convertShape(e1[3].dims)));
        let k = [
            l,
            o,
            a / y
        ];
        S.push(...N(k));
        let P = (D)=>{
            let R = T.length, G = E("a", e1[0].dataType, R, h), K = E("b", 12, A.length, _), j = E("scales", e1[2].dataType, e1[2].dims.length), V = [
                G,
                K,
                j
            ], Q = e1.length === 4 ? E("zero_points", 12, e1[3].dims.length) : void 0;
            Q && V.push(Q);
            let se = k.length, Y = M("output", e1[0].dataType, se, y), ee = _e(e1[0].dataType), J = (()=>{
                switch(h){
                    case 1:
                        return "array<".concat(ee, ", 8>");
                    case 2:
                        return "mat4x2<".concat(ee, ">");
                    case 4:
                        return "mat2x4<".concat(ee, ">");
                    default:
                        throw new Error("".concat(h, "-component is not supported."));
                }
            })(), ne = ()=>{
                let $e = "\n          // reuse a data\n            var input_offset = ".concat(G.indicesToOffset("".concat(G.type.indices, "(batch, row, word_offset)")), ";\n            var a_data: ").concat(J, ";\n            for (var j: u32 = 0; j < ").concat(8 / h, "; j++) {\n              a_data[j] = ").concat(G.getByOffset("input_offset"), ";\n              input_offset++;\n            }\n          ");
                for(let le = 0; le < y * x; le++)$e += "\n            b_value = ".concat(_ === 1 ? "b".concat(le, "_data") : "b".concat(le, "_data[i]"), ";\n            b_value_lower = unpack4xU8(b_value & b_mask);\n            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);\n            b_quantized_values = ").concat(J, "(").concat(Array.from({
                    length: 4
                }, (W, q)=>"".concat(ee, "(b_value_lower[").concat(q, "]), ").concat(ee, "(b_value_upper[").concat(q, "])")).join(", "), ");\n            b_dequantized_values = ").concat((()=>h === 1 ? "".concat(J, "(").concat(Array.from({
                        length: 8
                    }, (W, q)=>"(b_quantized_values[".concat(q, "] - ").concat(Q ? "zero_point".concat(le) : "zero_point", ") * scale").concat(le)).join(", "), ");") : "(b_quantized_values - ".concat(J, "(").concat(Array(8).fill("".concat(Q ? "zero_point".concat(le) : "zero_point")).join(","), ")) * scale").concat(le, ";"))(), ";\n            workgroup_shared[local_id.x * ").concat(x, " + ").concat(Math.floor(le / y), "]").concat(y > 1 ? "[".concat(le % y, "]") : "", " += ").concat(Array.from({
                    length: 8 / h
                }, (W, q)=>"".concat(h === 1 ? "a_data[".concat(q, "] * b_dequantized_values[").concat(q, "]") : "dot(a_data[".concat(q, "], b_dequantized_values[").concat(q, "])"))).join(" + "), ";\n          ");
                return $e;
            }, be = ()=>{
                let $e = "\n            var col_index = col * ".concat(y, ";\n            ").concat(Q ? "\n            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;\n            var zero_point_byte_count: u32;\n            var zero_point_word_index: u32;\n            var zero_point_byte_offset: u32;\n            let zero_point_nibble_offset: u32 = block & 0x1u;\n            var zero_point_bits_offset: u32;\n            var zero_point_word: u32;" : "\n            // The default zero point is 8 for unsigned 4-bit quantization.\n            let zero_point = ".concat(ee, "(8);"), "\n            ");
                for(let le = 0; le < y * x; le++)$e += "\n            let scale".concat(le, " = ").concat(j.getByOffset("col_index * nBlocksPerCol + block"), ";\n            ").concat(Q ? "\n            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);\n            zero_point_word_index = zero_point_byte_count >> 0x2u;\n            zero_point_byte_offset = zero_point_byte_count & 0x3u;\n            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);\n            zero_point_word = ".concat(Q.getByOffset("zero_point_word_index"), " >> zero_point_bits_offset;\n            let zero_point").concat(le, " = ").concat(ee, "((zero_point_word) & 0xFu);") : "", "\n            col_index += 1;");
                return $e;
            }, Oe = ()=>{
                let $e = "col_index = col * ".concat(y, ";");
                for(let le = 0; le < y * x; le++)$e += "\n            let b".concat(le, "_data = ").concat(K.getByIndices("".concat(K.type.indices, "(col_index, block, word)")), ";\n            col_index += 1;");
                return $e += "\n            var b_value: u32;\n            let b_mask: u32 = 0x0F0F0F0Fu;\n            var b_value_lower: vec4<u32>;\n            var b_value_upper: vec4<u32>;\n            var b_quantized_values: ".concat(J, ";\n            var b_dequantized_values: ").concat(J, ";"), $e;
            };
            return "\n        var<workgroup> workgroup_shared: array<".concat(Y.type.value, ", ").concat(x * v, ">;\n        ").concat(D.declareVariables(...V, Y), "\n        ").concat(D.mainStart([
                v,
                1,
                1
            ]), "\n          let output_indices = ").concat(Y.offsetToIndices("(global_idx / ".concat(v, ") * ").concat(x)), ";\n          let col = output_indices[2];\n          let row = output_indices[1];\n          let batch = output_indices[0];\n          let nBlocksPerCol = uniforms.b_shape[1];\n\n          for (var block = local_id.x; block < nBlocksPerCol; block += ").concat(v, ") {\n            //process one block\n            var word_offset: u32 = block * ").concat(t.blockSize / h, ";\n            ").concat(be(), "\n            for (var word: u32 = 0; word < ").concat(m, "; word += ").concat(_, ") {\n              ").concat(Oe(), "\n              for (var i: u32 = 0; i < ").concat(_, "; i++) {\n                ").concat(ne(), "\n                word_offset += ").concat(8 / h, ";\n              }\n            }\n          }\n          workgroupBarrier();\n\n          if (local_id.x < ").concat(x, ") {\n            var output_value: ").concat(Y.type.value, " = ").concat(Y.type.value, "(0);\n            var workgroup_shared_offset: u32 = local_id.x;\n            for (var b: u32 = 0u; b < ").concat(v, "u; b++) {\n              output_value += workgroup_shared[workgroup_shared_offset];\n              workgroup_shared_offset += ").concat(x, ";\n            }\n            ").concat(Y.setByIndices("".concat(Y.type.indices, "(batch, row, col + local_id.x)"), "output_value"), ";\n          }\n        }");
        };
        return {
            name: "MatMulNBits",
            shaderCache: {
                hint: "".concat(t.blockSize, ";").concat(t.bits, ";").concat(h, ";").concat(_, ";").concat(y, ";").concat(x, ";").concat(v),
                inputDependencies: Array(e1.length).fill("rank")
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: g,
                            dataType: u
                        }
                    ],
                    dispatchGroup: {
                        x: $
                    },
                    programUniforms: S
                }),
            getShaderSource: P
        };
    }, mh = (e1, t)=>{
        let r = e1[0].dims, n = r.length, o = r[n - 2], i = t.k, a = t.n, d = r.slice(0, n - 2), l = C.size(d), m = e1[1].dims[2] / 4, u = e1[0].dataType, h = me(t.k), _ = me(m), y = d.concat([
            o,
            a
        ]), g = 128, x = a % 8 === 0 ? 8 : a % 4 === 0 ? 4 : 1, $ = g / x, v = $ * _ * 8, S = v / h, T = v / t.blockSize, A = C.size(y) / x, k = [], P = [
            l,
            o,
            i / h
        ], D = C.convertShape(e1[1].dims).slice();
        D.splice(-1, 1, m / _), k.push(...N(P)), k.push(...N(D)), k.push(...N(e1[2].dims)), e1.length === 4 && k.push(...N(C.convertShape(e1[3].dims)));
        let R = [
            l,
            o,
            a
        ];
        k.push(...N(R));
        let G = (K)=>{
            let j = P.length, V = E("a", e1[0].dataType, j, h), Q = E("b", 12, D.length, _), se = E("scales", e1[2].dataType, e1[2].dims.length), Y = [
                V,
                Q,
                se
            ], ee = e1.length === 4 ? E("zero_points", 12, e1[3].dims.length) : void 0;
            ee && Y.push(ee);
            let J = R.length, ne = M("output", e1[0].dataType, J), be = _e(e1[0].dataType), Oe = ()=>{
                switch(h){
                    case 1:
                        return "\n          let a_data0 = vec4<".concat(be, ">(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);\n          let a_data1 = vec4<").concat(be, ">(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);");
                    case 2:
                        return "\n          let a_data0 = vec4<".concat(be, ">(sub_a[word_offset], sub_a[word_offset + 1]);\n          let a_data1 = vec4<").concat(be, ">(sub_a[word_offset + 2], sub_a[word_offset + 3]);");
                    case 4:
                        return "\n          let a_data0 = sub_a[word_offset];\n          let a_data1 = sub_a[word_offset + 1];";
                    default:
                        throw new Error("".concat(h, "-component is not supported."));
                }
            };
            return "\n        var<workgroup> sub_a: array<".concat(V.type.value, ", ").concat(S, ">;\n        var<workgroup> inter_results: array<array<").concat(ne.type.value, ", ").concat($, ">, ").concat(x, ">;\n        ").concat(K.declareVariables(...Y, ne), "\n        ").concat(K.mainStart([
                $,
                x,
                1
            ]), "\n          let output_indices = ").concat(ne.offsetToIndices("workgroup_index * ".concat(x)), ";\n          let col = output_indices[2];\n          let row = output_indices[1];\n          let batch = output_indices[0];\n          let n_blocks_per_col = uniforms.b_shape[1];\n          let num_tiles =  (n_blocks_per_col - 1) / ").concat(T, " + 1;\n\n          // Loop over shared dimension.\n          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {\n            let a_col_start = tile * ").concat(S, ";\n            // load one tile A data into shared memory.\n            for (var a_offset = local_idx; a_offset < ").concat(S, "; a_offset += ").concat(g, ")\n            {\n              let a_col = a_col_start + a_offset;\n              if (a_col < uniforms.a_shape[2])\n              {\n                sub_a[a_offset] = ").concat(V.getByIndices("".concat(V.type.indices, "(batch, row, a_col)")), ";\n              } else {\n                sub_a[a_offset] = ").concat(V.type.value, "(0);\n              }\n            }\n            workgroupBarrier();\n\n            // each thread process one block\n            let b_row = col + local_id.y;\n            let block = tile * ").concat(T, " + local_id.x;\n            ").concat(ee ? "\n            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;\n            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);\n            let zero_point_word_index = zero_point_byte_count >> 0x2u;\n            let zero_point_byte_offset = zero_point_byte_count & 0x3u;\n            let zero_point_nibble_offset: u32 = block & 0x1u;\n            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);\n            let zero_point_word = ".concat(ee.getByOffset("zero_point_word_index"), " >> zero_point_bits_offset;\n            let zero_point = ").concat(be, "((zero_point_word) & 0xFu);") : "\n            // The default zero point is 8 for unsigned 4-bit quantization.\n            let zero_point = ".concat(be, "(8);"), "\n            let scale = ").concat(se.getByOffset("b_row * n_blocks_per_col + block"), ";\n            let b_data = ").concat(Q.getByIndices("".concat(Q.type.indices, "(b_row, block, 0)")), ";\n            var word_offset = local_id.x * ").concat(t.blockSize / h, ";\n            for (var i: u32 = 0; i < ").concat(_, "; i++) {\n              ").concat(Oe(), "\n              let b_value = ").concat(_ === 1 ? "b_data" : "b_data[i]", ";\n              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);\n              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);\n              let b_quantized_values = mat2x4<").concat(be, ">(").concat(Array.from({
                length: 4
            }, ($e, le)=>"".concat(be, "(b_value_lower[").concat(le, "]), ").concat(be, "(b_value_upper[").concat(le, "])")).join(", "), ");\n              let b_dequantized_values = (b_quantized_values - mat2x4<").concat(be, ">(").concat(Array(8).fill("zero_point").join(","), ")) * scale;\n              inter_results[local_id.y][local_id.x] += ").concat(Array.from({
                length: 2
            }, ($e, le)=>"".concat("dot(a_data".concat(le, ", b_dequantized_values[").concat(le, "])"))).join(" + "), ";\n              word_offset += ").concat(8 / h, ";\n            }\n            workgroupBarrier();\n          }\n\n          if (local_idx < ").concat(x, ") {\n            var output_value: ").concat(ne.type.value, " = ").concat(ne.type.value, "(0);\n            for (var b = 0u; b < ").concat($, "; b++) {\n              output_value += inter_results[local_idx][b];\n            }\n            if (col + local_idx < uniforms.output_shape[2])\n            {\n              ").concat(ne.setByIndices("".concat(ne.type.indices, "(batch, row, col + local_idx)"), "output_value"), "\n            }\n          }\n        }");
        };
        return {
            name: "BlockwiseMatMulNBits32",
            shaderCache: {
                hint: "".concat(t.blockSize, ";").concat(h, ";").concat(_, ";").concat($, ";").concat(x),
                inputDependencies: Array(e1.length).fill("rank")
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: y,
                            dataType: u
                        }
                    ],
                    dispatchGroup: {
                        x: A
                    },
                    programUniforms: k
                }),
            getShaderSource: G
        };
    }, el = (e1, t)=>{
        ch(e1.inputs, t), t.blockSize === 32 && e1.adapterInfo.isVendor("intel") && e1.adapterInfo.isArchitecture("gen-12lp") ? e1.compute(mh(e1.inputs, t)) : e1.compute(ph(e1.inputs, t));
    }, tl = (e1)=>re(e1);
});
var fh, hh, gh, bh, yh, _h, wh, vh, nl, ol = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    fh = (e1)=>{
        if (!e1 || e1.length < 1) throw new Error("Too few inputs");
        if (e1[0].dataType !== 1 && e1[0].dataType !== 10) throw new Error("Input type must be float or float16.");
        if (e1.length >= 2) {
            let t = e1[0].dims.length * 2 === e1[1].dims[0];
            if (e1.length === 4 && (t = e1[3].dims[0] * 2 === e1[1].dims[0]), !t) throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].");
        }
    }, hh = (e1, t, r)=>{
        let n = "";
        for(let o = t - 1; o >= 0; --o)n += "\n            k = i32(".concat(e1.indicesGet("indices", o), ") - ").concat(F("uniforms.pads", o, r), ";\n            if (k < 0) {\n              break;\n            }\n            if (k >= i32(").concat(F("uniforms.x_shape", o, t), ")) {\n              break;\n            }\n            offset += k * i32(").concat(F("uniforms.x_strides", o, t), ");\n        ");
        return "\n          value = ".concat(e1.type.value, "(uniforms.constant_value);\n          for (var i = 0; i < 1; i++) {\n            var offset = 0;\n            var k = 0;\n            ").concat(n, "\n            value = x[offset];\n          }\n      ");
    }, gh = (e1, t, r)=>{
        let n = "";
        for(let o = t - 1; o >= 0; --o)n += "\n                k = i32(".concat(e1.indicesGet("indices", o), ") - ").concat(F("uniforms.pads", o, r), ";\n                if (k < 0) {\n                  k = -k;\n                }\n                {\n                  let _2n_1 = 2 * (i32(").concat(F("uniforms.x_shape", o, t), ") - 1);\n                  k = k % _2n_1;\n                  if(k >= i32(").concat(F("uniforms.x_shape", o, t), ")) {\n                    k = _2n_1 - k;\n                  }\n                }\n                offset += k * i32(").concat(F("uniforms.x_strides", o, t), ");\n            ");
        return "\n              var offset = 0;\n              var k = 0;\n              ".concat(n, "\n              value = x[offset];\n          ");
    }, bh = (e1, t, r)=>{
        let n = "";
        for(let o = t - 1; o >= 0; --o)n += "\n                k = i32(".concat(e1.indicesGet("indices", o), ") - ").concat(F("uniforms.pads", o, r), ";\n                if (k < 0) {\n                  k = 0;\n                }\n                if (k >= i32(").concat(F("uniforms.x_shape", o, t), ")) {\n                  k = i32(").concat(F("uniforms.x_shape", o, t), ") - 1;\n                }\n                offset += k * i32(").concat(F("uniforms.x_strides", o, t), ");\n            ");
        return "\n              var offset = 0;\n              var k = 0;\n              ".concat(n, "\n              value = x[offset];\n          ");
    }, yh = (e1, t, r)=>{
        let n = "";
        for(let o = t - 1; o >= 0; --o)n += "\n                k = i32(".concat(e1.indicesGet("indices", o), ") - ").concat(F("uniforms.pads", o, r), ";\n                if (k < 0)  {\n                  k += i32(").concat(F("uniforms.x_shape", o, t), "]);\n                }\n                if (k >= i32(").concat(F("uniforms.x_shape", o, t), ")) {\n                  k -= i32(").concat(F("uniforms.x_shape", o, t), ");\n                }\n                offset += k * i32(").concat(F("uniforms.x_strides", o, t), ");\n            ");
        return "\n              var offset = 0;\n              var k = 0;\n              ".concat(n, "\n              value = x[offset];\n          ");
    }, _h = (e1, t, r)=>{
        switch(r.mode){
            case 0:
                return hh(e1, t, r.pads.length);
            case 1:
                return gh(e1, t, r.pads.length);
            case 2:
                return bh(e1, t, r.pads.length);
            case 3:
                return yh(e1, t, r.pads.length);
            default:
                throw new Error("Invalid mode");
        }
    }, wh = (e1, t)=>{
        let r = C.padShape(e1[0].dims.slice(), t.pads), n = e1[0].dims, o = C.size(r), i = [
            {
                type: 12,
                data: o
            },
            {
                type: 6,
                data: t.pads
            }
        ], a = e1.length >= 3 && e1[2].data;
        t.mode === 0 && i.push({
            type: a ? e1[2].dataType : 1,
            data: t.value
        }), i.push(...N(e1[0].dims, r));
        let d = [
            "rank"
        ], l = (p)=>{
            let m = M("output", e1[0].dataType, r.length), u = E("x", e1[0].dataType, n.length), h = u.type.value, _ = _h(m, n.length, t), y = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "pads",
                    type: "i32",
                    length: t.pads.length
                }
            ];
            return t.mode === 0 && y.push({
                name: "constant_value",
                type: a ? h : "f32"
            }), "\n            ".concat(p.registerUniforms(y).declareVariables(u, m), "\n            ").concat(p.mainStart(), "\n            ").concat(p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n\n            let indices = ").concat(m.offsetToIndices("global_idx"), ";\n\n            var value = ").concat(h, "(0);\n            ").concat(_, "\n            output[global_idx] = value;\n        }");
        };
        return {
            name: "Pad",
            shaderCache: {
                hint: "".concat(t.mode).concat(a),
                inputDependencies: d
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: r,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(C.size(r) / 64)
                    },
                    programUniforms: i
                }),
            getShaderSource: l
        };
    }, vh = (e1, t)=>{
        if (e1.length > 1) {
            let r = e1[1].getBigInt64Array(), n = e1.length >= 3 && e1[2].data ? e1[2].dataType === 10 ? e1[2].getUint16Array()[0] : e1[2].getFloat32Array()[0] : 0, o = e1[0].dims.length, i = new Int32Array(2 * o).fill(0);
            if (e1.length >= 4) {
                let d = e1[3].getBigInt64Array();
                for(let l = 0; l < d.length; l++)i[Number(d[l])] = Number(r[l]), i[Number(d[l]) + o] = Number(r[l + d.length]);
            } else r.forEach((d, l)=>i[Number(l)] = Number(d));
            let a = [];
            return i.forEach((d)=>a.push(d)), {
                mode: t.mode,
                value: n,
                pads: a
            };
        } else return t;
    }, nl = (e1, t)=>{
        fh(e1.inputs);
        let r = vh(e1.inputs, t);
        e1.compute(wh(e1.inputs, r), {
            inputs: [
                0
            ]
        });
    };
});
var tn, il, al, sl, ul, $h, xh, dl, ll, cl, pl, ml, fl, hl, gl, bl, yl, _l, wl, vl = U(()=>{
    "use strict";
    We();
    te();
    oe();
    ae();
    tn = (e1)=>{
        if (ve.webgpu.validateInputContent && (!e1 || e1.length !== 1)) throw new Error("Pool ops requires 1 input.");
    }, il = (e1, t, r)=>{
        let n = t.format === "NHWC", o = e1.dims.slice();
        n && o.splice(1, 0, o.pop());
        let i = Object.hasOwnProperty.call(t, "dilations"), a = t.kernelShape.slice(), d = t.strides.slice(), l = i ? t.dilations.slice() : [], p = t.pads.slice();
        At.adjustPoolAttributes(r, o, a, d, l, p);
        let m = At.computePoolOutputShape(r, o, d, l, a, p, t.autoPad), u = Object.assign({}, t);
        i ? Object.assign(u, {
            kernelShape: a,
            strides: d,
            pads: p,
            dilations: l,
            cacheKey: t.cacheKey
        }) : Object.assign(u, {
            kernelShape: a,
            strides: d,
            pads: p,
            cacheKey: t.cacheKey
        });
        let h = m.slice();
        return h.push(h.splice(1, 1)[0]), [
            u,
            n ? h : m
        ];
    }, al = (e1, t)=>{
        let r = t.format === "NHWC", n = C.size(e1), o = C.size(t.kernelShape), i = [
            {
                type: 12,
                data: n
            },
            {
                type: 12,
                data: o
            }
        ], a = [
            {
                name: "outputSize",
                type: "u32"
            },
            {
                name: "kernelSize",
                type: "u32"
            }
        ];
        if (t.kernelShape.length <= 2) {
            let d = t.kernelShape[t.kernelShape.length - 1], l = t.strides[t.strides.length - 1], p = t.pads[t.pads.length / 2 - 1], m = t.pads[t.pads.length - 1], u = !!(p + m);
            i.push({
                type: 12,
                data: d
            }, {
                type: 12,
                data: l
            }, {
                type: 12,
                data: p
            }, {
                type: 12,
                data: m
            }), a.push({
                name: "kw",
                type: "u32"
            }, {
                name: "sw",
                type: "u32"
            }, {
                name: "pwStart",
                type: "u32"
            }, {
                name: "pwEnd",
                type: "u32"
            });
            let h = !1;
            if (t.kernelShape.length === 2) {
                let _ = t.kernelShape[t.kernelShape.length - 2], y = t.strides[t.strides.length - 2], g = t.pads[t.pads.length / 2 - 2], x = t.pads[t.pads.length - 2];
                h = !!(g + x), i.push({
                    type: 12,
                    data: _
                }, {
                    type: 12,
                    data: y
                }, {
                    type: 12,
                    data: g
                }, {
                    type: 12,
                    data: x
                }), a.push({
                    name: "kh",
                    type: "u32"
                }, {
                    name: "sh",
                    type: "u32"
                }, {
                    name: "phStart",
                    type: "u32"
                }, {
                    name: "phEnd",
                    type: "u32"
                });
            }
            return [
                i,
                a,
                !0,
                u,
                h
            ];
        } else {
            if (r) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
            let d = C.computeStrides(t.kernelShape);
            i.push({
                type: 12,
                data: d
            }, {
                type: 12,
                data: t.pads
            }, {
                type: 12,
                data: t.strides
            }), a.push({
                name: "kernelStrides",
                type: "u32",
                length: d.length
            }, {
                name: "pads",
                type: "u32",
                length: t.pads.length
            }, {
                name: "strides",
                type: "u32",
                length: t.strides.length
            });
            let l = t.pads.reduce((p, m)=>p + m);
            return [
                i,
                a,
                !!l,
                !1,
                !1
            ];
        }
    }, sl = (e1, t, r, n, o, i, a, d, l, p, m, u)=>{
        let h = o.format === "NHWC", _ = t.type.value, y = M("output", t.type.tensor, n);
        if (o.kernelShape.length <= 2) {
            let g = "", x = "", $ = "", v = r - (h ? 2 : 1);
            if (m ? g = "\n                for (var i: u32 = 0u; i < uniforms.kw; i++) {\n                  xIndices[".concat(v, "] = indices[").concat(v, "] * uniforms.sw - uniforms.pwStart + i;\n                  if (xIndices[").concat(v, "] < 0 || xIndices[").concat(v, "]\n                      >= uniforms.x_shape[").concat(v, "]) {\n                    pad++;\n                    continue;\n                  }\n                  let x_val = x[").concat(t.indicesToOffset("xIndices"), "];\n                  ").concat(i, "\n                }") : g = "\n                for (var i: u32 = 0u; i < uniforms.kw; i++) {\n                  xIndices[".concat(v, "] = indices[").concat(v, "] * uniforms.sw - uniforms.pwStart + i;\n                  let x_val = x[").concat(t.indicesToOffset("xIndices"), "];\n                  ").concat(i, "\n                }"), o.kernelShape.length === 2) {
                let T = r - (h ? 3 : 2);
                u ? x = "\n                for (var j: u32 = 0u; j < uniforms.kh; j++) {\n                  xIndices[".concat(T, "] = indices[").concat(T, "] * uniforms.sh - uniforms.phStart + j;\n                  if (xIndices[").concat(T, "] < 0 || xIndices[").concat(T, "] >= uniforms.x_shape[").concat(T, "]) {\n                    pad += i32(uniforms.kw);\n                    continue;\n                  }\n              ") : x = "\n                for (var j: u32 = 0u; j < uniforms.kh; j++) {\n                  xIndices[".concat(T, "] = indices[").concat(T, "] * uniforms.sh - uniforms.phStart + j;\n                "), $ = "\n              }\n            ";
            }
            return "\n            ".concat(e1.registerUniforms(l).declareVariables(t, y), "\n\n            ").concat(e1.mainStart(), "\n              ").concat(e1.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n\n              let indices = ").concat(y.offsetToIndices("global_idx"), ";\n              var xIndices = ").concat(y.offsetToIndices("global_idx"), ";\n\n              var value = ").concat(_, "(").concat(d, ");\n              var pad = 0;\n              ").concat(x, "\n              ").concat(g, "\n              ").concat($, "\n              ").concat(a, "\n\n              output[global_idx] = value;\n            }");
        } else {
            if (h) throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");
            let g = o.kernelShape.length, x = o.pads.length, $ = "";
            return p ? $ = "\n                if (xIndices[j] >= uniforms.x_shape[j]) {\n                  pad++;\n                  isPad = true;\n                  break;\n                }\n              }\n              if (!isPad) {\n                let x_val = x[".concat(t.indicesToOffset("xIndices"), "];\n                ").concat(i, "\n              }") : $ = "\n              }\n              let x_val = x[".concat(t.indicesToOffset("xIndices"), "];\n              ").concat(i, "\n            "), "\n            ".concat(e1.registerUniforms(l).declareVariables(t, y), "\n\n            ").concat(e1.mainStart(), "\n              ").concat(e1.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n              let indices = ").concat(y.offsetToIndices("global_idx"), ";\n              var xIndices = ").concat(y.offsetToIndices("global_idx"), ";\n\n              var offsets: array<u32, ").concat(g, ">;\n\n              var value = ").concat(_, "(").concat(d, ");\n              var pad = 0;\n              var isPad = false;\n\n              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {\n                var offset = i;\n                for (var j = 0u; j < ").concat(g - 1, "u; j++) {\n                  offsets[j] = offset / ").concat(F("uniforms.kernelStrides", "j", g), ";\n                  offset -= offsets[j] * ").concat(F("uniforms.kernelStrides", "j", g), ";\n                }\n                offsets[").concat(g - 1, "] = offset;\n\n                isPad = false;\n                for (var j = ").concat(r - g, "u; j < ").concat(r, "u; j++) {\n                  xIndices[j] = indices[j] * ").concat(F("uniforms.strides", "j - ".concat(r - g, "u"), g), "\n                    + offsets[j - ").concat(r - g, "u] - ").concat(F("uniforms.pads", "j - 2u", x), ";\n                  ").concat($, "\n              }\n              ").concat(a, "\n\n              output[global_idx] = value;\n            }");
        }
    }, ul = (e1)=>"".concat(e1.format, ";").concat(e1.ceilMode, ";").concat(e1.autoPad, ";").concat(e1.kernelShape.length), $h = (e1)=>"".concat(ul(e1), ";").concat(e1.countIncludePad), xh = (e1)=>"".concat(ul(e1), ";").concat(e1.storageOrder, ";").concat(e1.dilations), dl = (e1)=>({
            format: e1.format,
            autoPad: [
                "NOTSET",
                "VALID",
                "SAME_UPPER",
                "SAME_LOWER"
            ][e1.auto_pad],
            ceilMode: e1.ceil_mode,
            kernelShape: e1.kernel_shape,
            strides: e1.strides,
            pads: e1.pads
        }), ll = (e1, t, r, n)=>{
        let [o, i] = il(t, n, r), a = E("x", t.dataType, t.dims.length), d = a.type.value, l = "value += x_val;", p = "";
        o.countIncludePad ? p += "value /= ".concat(d, "(uniforms.kernelSize);") : p += "value /= ".concat(d, "(i32(uniforms.kernelSize) - pad);");
        let [m, u, h, _, y] = al(i, o);
        m.push(...N(t.dims, i));
        let g = [
            "rank"
        ];
        return {
            name: e1,
            shaderCache: {
                hint: "".concat(n.cacheKey, ";").concat(h, ";").concat(_, ";").concat(y),
                inputDependencies: g
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: i,
                            dataType: t.dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(C.size(i) / 64)
                    },
                    programUniforms: m
                }),
            getShaderSource: (x)=>sl(x, a, t.dims.length, i.length, o, l, p, 0, u, h, _, y)
        };
    }, cl = (e1)=>{
        let t = e1.count_include_pad !== 0, r = dl(e1);
        if (r.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for AveragePool");
        let n = {
            countIncludePad: t,
            ...r,
            cacheKey: ""
        };
        return {
            ...n,
            cacheKey: $h(n)
        };
    }, pl = (e1, t)=>{
        tn(e1.inputs), e1.compute(ll("AveragePool", e1.inputs[0], !1, t));
    }, ml = {
        autoPad: "",
        ceilMode: 0,
        countIncludePad: !1,
        kernelShape: [],
        strides: [],
        pads: [],
        storageOrder: 0,
        dilations: []
    }, fl = (e1)=>{
        let t = e1.format;
        return {
            format: t,
            ...ml,
            cacheKey: t
        };
    }, hl = (e1, t)=>{
        tn(e1.inputs), e1.compute(ll("GlobalAveragePool", e1.inputs[0], !0, t));
    }, gl = (e1, t, r, n)=>{
        let [o, i] = il(t, n, r), a = "\n      value = max(x_val, value);\n    ", d = "", l = E("x", t.dataType, t.dims.length), p = [
            "rank"
        ], [m, u, h, _, y] = al(i, o);
        return m.push(...N(t.dims, i)), {
            name: e1,
            shaderCache: {
                hint: "".concat(n.cacheKey, ";").concat(h, ";").concat(_, ";").concat(y),
                inputDependencies: p
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: i,
                            dataType: t.dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(C.size(i) / 64)
                    },
                    programUniforms: m
                }),
            getShaderSource: (g)=>sl(g, l, t.dims.length, i.length, o, a, d, t.dataType === 10 ? -65504 : -1e5, u, h, _, y)
        };
    }, bl = (e1, t)=>{
        tn(e1.inputs), e1.compute(gl("MaxPool", e1.inputs[0], !1, t));
    }, yl = (e1)=>{
        let t = e1.storage_order, r = e1.dilations, n = dl(e1);
        if (t !== 0) throw new Error("column major storage order is not yet supported for MaxPool");
        if (n.ceilMode !== 0) throw new Error("using ceil() in shape computation is not yet supported for MaxPool");
        let o = {
            storageOrder: t,
            dilations: r,
            ...n,
            cacheKey: ""
        };
        return {
            ...o,
            cacheKey: xh(o)
        };
    }, _l = (e1)=>{
        let t = e1.format;
        return {
            format: t,
            ...ml,
            cacheKey: t
        };
    }, wl = (e1, t)=>{
        tn(e1.inputs), e1.compute(gl("GlobalMaxPool", e1.inputs[0], !0, t));
    };
});
var Th, Ih, $l, xl, Sl = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Th = (e1, t)=>{
        if (e1.length < 2 || e1.length > 3) throw new Error("DequantizeLinear requires 2 or 3 inputs.");
        if (e1.length === 3 && e1[1].dims === e1[2].dims) throw new Error("x-scale and x-zero-point must have the same shape.");
        if (e1.length === 3 && e1[0].dataType !== e1[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
        if (e1[0].dataType === 6 && e1.length > 2) throw new Error("In the case of dequantizing int32 there is no zero point.");
        if (e1[1].dims.length !== 0 && e1[1].dims.length !== 1 && e1[1].dims.length !== e1[0].dims.length) throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");
        if (e1.length > 2) {
            if (e1[0].dataType !== e1[2].dataType) throw new Error("x and x-zero-point must have the same data type.");
            if (e1[1].dims.length !== e1[2].dims.length) throw new Error("scale and zero-point inputs must have the same rank.");
            if (!e1[1].dims.map((r, n)=>r === e1[2].dims[n]).reduce((r, n)=>r && n, !0)) throw new Error("scale and zero-point inputs must have the same shape.");
        }
        if (t.blockSize > 0) {
            if (e1[1].dims.length === 0 || e1[1].dims.length === 1 && e1[1].dims[0] === 1) throw new Error("blockSize must be set only for block quantization.");
            if (!e1[1].dims.map((o, i)=>i === t.axis || o === e1[0].dims[i]).reduce((o, i)=>o && i, !0)) throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");
            if (e1[1].dims.length !== e1[0].dims.length) throw new Error("For block qunatization the scale input rank must be the same as the x rank.");
            let r = e1[0].dims[t.axis], n = e1[1].dims[t.axis];
            if (t.blockSize < Math.ceil(r / n) || t.blockSize > Math.ceil(r / (n - 1) - 1)) throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].");
        }
    }, Ih = (e1, t)=>{
        let r = C.normalizeAxis(t.axis, e1[0].dims.length), n = e1[0].dataType, o = n === 3, i = e1[0].dims, a = e1[1].dataType, d = C.size(i), l = n === 3 || n === 2, p = l ? [
            Math.ceil(C.size(e1[0].dims) / 4)
        ] : e1[0].dims, m = e1[1].dims, u = e1.length > 2 ? e1[2] : void 0, h = u ? l ? [
            Math.ceil(C.size(u.dims) / 4)
        ] : u.dims : void 0, _ = m.length === 0 || m.length === 1 && m[0] === 1, y = _ === !1 && m.length === 1, g = me(d), x = _ && (!l || g === 4), $ = x ? g : 1, v = x && !l ? g : 1, S = E("input", l ? 12 : n, p.length, v), T = E("scale", a, m.length), A = u ? E("zero_point", l ? 12 : n, h.length) : void 0, k = M("output", a, i.length, $), P = [
            S,
            T
        ];
        A && P.push(A);
        let D = [
            p,
            m
        ];
        u && D.push(h);
        let R = [
            {
                type: 12,
                data: d / $
            },
            {
                type: 12,
                data: r
            },
            {
                type: 12,
                data: t.blockSize
            },
            ...N(...D, i)
        ], G = (K)=>{
            let j = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "axis",
                    type: "u32"
                },
                {
                    name: "block_size",
                    type: "u32"
                }
            ];
            return "\n      ".concat(K.registerUniforms(j).declareVariables(...P, k), "\n      ").concat(K.mainStart(), "\n          ").concat(K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n          let output_indices = ").concat(k.offsetToIndices("global_idx"), ";\n\n          // Set input x\n          ").concat((()=>l ? "\n            let input = ".concat(S.getByOffset("global_idx / 4"), ";\n            let x_vec = ").concat(o ? "unpack4xI8(input)" : "unpack4xU8(input)", ";\n            let x_value = ").concat($ === 1 ? "x_vec[global_idx % 4]" : "x_vec", ";") : "let x_value = ".concat(S.getByOffset("global_idx"), ";"))(), ";\n\n          // Set scale input\n          ").concat((()=>_ ? "let scale_value= ".concat(T.getByOffset("0")) : y ? "\n            let scale_index = ".concat(k.indicesGet("output_indices", "uniforms.axis"), ";\n            let scale_value= ").concat(T.getByOffset("scale_index"), ";") : "\n            var scale_indices: ".concat(T.type.indices, " = output_indices;\n            let index = ").concat(T.indicesGet("scale_indices", "uniforms.axis"), " / uniforms.block_size;\n            ").concat(T.indicesSet("scale_indices", "uniforms.axis", "index"), ";\n            let scale_value= ").concat(T.getByIndices("scale_indices"), ";"))(), ";\n\n          // Set zero-point input\n          ").concat((()=>A ? _ ? l ? "\n                let zero_point_input = ".concat(A.getByOffset("0"), ";\n                let zero_point_vec =  ").concat(o ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)", ";\n                let zero_point_value= zero_point_vec[0]") : "let zero_point_value = ".concat(A.getByOffset("0")) : y ? l ? "\n                let zero_point_index = ".concat(k.indicesGet("output_indices", "uniforms.axis"), ";\n                let zero_point_input = ").concat(A.getByOffset("zero_point_index / 4"), ";\n                let zero_point_vec =  ").concat(o ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)", ";\n                let zero_point_value = zero_point_vec[zero_point_index % 4]") : "\n                let zero_point_index = ".concat(k.indicesGet("output_indices", "uniforms.axis"), ";\n                let zero_point_value = ").concat(A.getByOffset("zero_point_index"), ";") : l ? "\n                let zero_point_offset = ".concat(T.indicesToOffset("scale_indices"), ";\n                let zero_point_input = ").concat(A.getByOffset("zero_point_offset / 4"), ";\n                let zero_point_vec = ").concat(o ? "unpack4xI8(zero_point_input)" : "unpack4xU8(zero_point_input)", ";\n                let zero_point_value = zero_point_vec[zero_point_offset % 4];") : "let zero_point_value = ".concat(A.getByIndices("scale_indices"), ";") : "let zero_point_value = ".concat(l ? o ? "i32" : "u32" : S.type.value, "(0);"))(), ";\n      // Compute and write output\n      ").concat(k.setByOffset("global_idx", "".concat(k.type.value, "(x_value - zero_point_value) * scale_value")), ";\n      }");
        };
        return {
            name: "DequantizeLinear",
            shaderCache: {
                hint: t.cacheKey,
                inputDependencies: A ? [
                    "rank",
                    "rank",
                    "rank"
                ] : [
                    "rank",
                    "rank"
                ]
            },
            getShaderSource: G,
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: i,
                            dataType: a
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(d / $ / 64),
                        y: 1,
                        z: 1
                    },
                    programUniforms: R
                })
        };
    }, $l = (e1, t)=>{
        Th(e1.inputs, t), e1.compute(Ih(e1.inputs, t));
    }, xl = (e1)=>re({
            axis: e1.axis,
            blockSize: e1.blockSize
        });
});
var Ch, Ah, Tl, Il = U(()=>{
    "use strict";
    We();
    te();
    ae();
    Ch = (e1, t, r)=>{
        let n = e1 === t, o = e1 < t && r < 0, i = e1 > t && r > 0;
        if (n || o || i) throw new Error("Range these inputs' contents are invalid.");
    }, Ah = (e1, t, r, n)=>{
        let o = Math.abs(Math.ceil((t - e1) / r)), i = [
            o
        ], a = o, d = [
            {
                type: 12,
                data: a
            },
            {
                type: n,
                data: e1
            },
            {
                type: n,
                data: r
            },
            ...N(i)
        ], l = (p)=>{
            let m = M("output", n, i.length), u = m.type.value, h = [
                {
                    name: "outputSize",
                    type: "u32"
                },
                {
                    name: "start",
                    type: u
                },
                {
                    name: "delta",
                    type: u
                }
            ];
            return "\n        ".concat(p.registerUniforms(h).declareVariables(m), "\n        ").concat(p.mainStart(), "\n        ").concat(p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n        output[global_idx] = uniforms.start + ").concat(u, "(global_idx) * uniforms.delta;\n      }");
        };
        return {
            name: "Range",
            shaderCache: {
                hint: "".concat(n)
            },
            getShaderSource: l,
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: i,
                            dataType: n
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(a / 64)
                    },
                    programUniforms: d
                })
        };
    }, Tl = (e1)=>{
        let t = 0, r = 0, n = 0;
        e1.inputs[0].dataType === 6 ? (t = e1.inputs[0].getInt32Array()[0], r = e1.inputs[1].getInt32Array()[0], n = e1.inputs[2].getInt32Array()[0]) : e1.inputs[0].dataType === 1 && (t = e1.inputs[0].getFloat32Array()[0], r = e1.inputs[1].getFloat32Array()[0], n = e1.inputs[2].getFloat32Array()[0]), ve.webgpu.validateInputContent && Ch(t, r, n), e1.compute(Ah(t, r, n, e1.inputs[0].dataType), {
            inputs: []
        });
    };
});
var kh, Eh, Cl, Al, kl = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    kh = (e1, t, r, n)=>{
        if (e1 !== "none" && n !== "i32" && n !== "u32" && n !== "f32") throw new Error("Input ".concat(n, " is not supported with reduction ").concat(e1, "."));
        let o = "{\n                var oldValue = 0;\n                loop {\n                  let newValueF32 =", i = ";\n                  let newValue = bitcast<i32>(newValueF32);\n                  let res = atomicCompareExchangeWeak(&".concat(t, ", oldValue, newValue);\n                  if res.exchanged {\n                    break;\n                  }\n                  oldValue = res.old_value;\n                }\n              }");
        switch(e1){
            case "none":
                return "".concat(t, "=").concat(r, ";");
            case "add":
                return n === "i32" || n === "u32" ? "atomicAdd(&".concat(t, ", bitcast<").concat(n, ">(").concat(r, "));") : "\n              ".concat(o, "bitcast<").concat(n, ">(oldValue) + (").concat(r, ")").concat(i);
            case "max":
                return n === "i32" || n === "u32" ? "atomicMax(&".concat(t, ", bitcast<").concat(n, ">(").concat(r, "));") : "\n                ".concat(o, "max(bitcast<f32>(oldValue), (").concat(r, "))").concat(i);
            case "min":
                return n === "i32" || n === "u32" ? "atomicMin(&".concat(t, ", bitcast<").concat(n, ">(").concat(r, "));") : "".concat(o, "min(bitcast<").concat(n, ">(oldValue), (").concat(r, "))").concat(i);
            case "mul":
                return "".concat(o, "(bitcast<").concat(n, ">(oldValue) * (").concat(r, "))").concat(i);
            default:
                throw new Error("Reduction ".concat(e1, " is not supported."));
        }
    }, Eh = (e1, t)=>{
        let r = e1[0].dims, n = e1[1].dims, o = r, i = 1, a = Math.ceil(C.size(n) / i), d = n[n.length - 1], l = C.sizeFromDimension(r, d), p = [
            {
                type: 12,
                data: a
            },
            {
                type: 12,
                data: d
            },
            {
                type: 12,
                data: l
            },
            ...N(e1[1].dims, e1[2].dims, o)
        ], m = (u)=>{
            let h = E("indices", e1[1].dataType, e1[1].dims.length), _ = E("updates", e1[2].dataType, e1[2].dims.length, i), y = t.reduction !== "none" && t.reduction !== "" ? rs("output", e1[0].dataType, o.length) : M("output", e1[0].dataType, o.length, i);
            return "\n      ".concat(u.registerUniform("output_size", "u32").registerUniform("last_index_dimension", "u32").registerUniform("num_updates_elements", "u32").declareVariables(h, _, y), "\n      ").concat(u.mainStart(), "\n        ").concat(u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n  var data_offset = 0u;\n  let indices_start = uniforms.last_index_dimension * global_idx;\n  let indices_end = indices_start + uniforms.last_index_dimension;\n  for (var i = indices_start; i < indices_end; i++) {\n    var index = i32(indices[i].x);\n    ").concat(e1[0].dims.length === 1 ? "\n    let element_count_dim = uniforms.output_strides;\n    let dim_value = uniforms.output_shape;" : "\n    let element_count_dim = uniforms.output_strides[i - indices_start];\n    let dim_value = uniforms.output_shape[i - indices_start + uniforms.last_index_dimension];", "\n    if (index >= 0) {\n      if (index >= i32(dim_value)) {\n        index = i32(dim_value - 1);\n      }\n    } else {\n      if (index < -i32(dim_value)) {\n        index = 0;\n      } else {\n        index += i32(dim_value);\n      }\n    }\n    data_offset += u32((u32(index) * element_count_dim));\n  }\n\n  for (var i = 0u; i < uniforms.num_updates_elements; i++) {\n    let value = updates[uniforms.num_updates_elements * global_idx + i];\n    ").concat(kh(t.reduction, "output[data_offset + i]", "value", y.type.value), "\n  }\n\n      }");
        };
        return {
            name: "ScatterND",
            shaderCache: {
                hint: "".concat(t.cacheKey, "_").concat(t.reduction),
                inputDependencies: [
                    "rank",
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: o,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(a / 64)
                    },
                    programUniforms: p
                }),
            getShaderSource: m
        };
    }, Cl = (e1)=>re({
            reduction: e1.reduction
        }), Al = (e1, t)=>{
        e1.compute(Eh(e1.inputs, t), {
            inputs: [
                e1.inputs[1],
                e1.inputs[2]
            ],
            outputs: []
        });
    };
});
var Ph, zh, Oh, Dh, Bh, Mh, Rh, Uh, Nh, Vh, Wh, El, Lh, Gh, Hh, Fh, qh, Pl, zl, Ol = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Ph = (e1, t)=>{
        if (e1.every((r)=>r > 0 || (()=>{
                throw new Error("Resize requires scales input values to be positive");
            })), e1.length > 0) {
            if (t.mode === "linear") {
                if (!(e1.length === 2 || e1.length === 3 || e1.length === 4 && e1[0] === 1 && e1[1] === 1 || e1.length === 4 && e1[0] === 1 && e1[3] === 1 || e1.length === 5 && e1[0] === 1 && e1[1] === 1)) throw new Error("For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and\n            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1");
            } else if (t.mode === "cubic" && !(e1.length === 2 || e1.length === 4 && e1[0] === 1 && e1[1] === 1 || e1.length === 4 && e1[0] === 1 && e1[3] === 1)) throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode");
        }
    }, zh = (e1, t, r)=>{
        t.every((o)=>o >= 0 && o < r || (()=>{
                throw new Error("Resize requires axes input values to be positive and less than rank");
            }));
        let n = new Array(r).fill(1);
        return t.forEach((o, i)=>n[o] = e1[i]), n;
    }, Oh = (e1, t, r, n, o, i)=>{
        let [a, d, l] = r > 10 ? [
            1,
            2,
            3
        ] : [
            -1,
            e1.length > 1 ? 1 : -1,
            -1
        ], p = e1[0].dims.length;
        if (a > 0 && e1.length > a && e1[a].dims.length > 0) e1[a].getFloat32Array().forEach((m)=>i.push(m));
        else if (t.coordinateTransformMode === "tf_crop_and_resize") throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");
        if (d > 0 && e1.length > d && e1[d].dims.length === 1 && e1[d].dims[0] > 0) {
            if (e1[d].getFloat32Array().forEach((m)=>n.push(m)), n.length !== 0 && n.length !== p && r >= 18 && n.length !== t.axes.length) throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");
            Ph(n, t), t.axes.length > 0 && zh(n, t.axes, p).forEach((m, u)=>n[u] = m);
        }
        if (l > 0 && e1.length > l && e1[l].dims.length === 1 && e1[l].dims[0] > 0 && (e1[l].getBigInt64Array().forEach((m)=>o.push(Number(m))), o.length !== 0 && o.length !== p && r >= 18 && o.length !== t.axes.length)) throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");
        if (t.axes.length > 0) {
            if (n.length !== 0 && n.length !== t.axes.length) throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');
            if (o.length !== 0 && o.length !== t.axes.length) throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified');
        }
        if (typeof n < "u" && typeof o < "u" && n.length > 0 && o.length > p) throw new Error("Resize requires only of scales or sizes to be specified");
    }, Dh = (e1, t)=>"fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,\n     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ".concat(t, " { ") + (()=>{
            switch(e1){
                case "asymmetric":
                    return "return ".concat(t, "(xResized) / ").concat(t, "(xScale);");
                case "pytorch_half_pixel":
                    return "if (lengthResized > 1) {\n                    return (".concat(t, "(xResized) + 0.5) / ").concat(t, "(xScale) - 0.5;\n                  } else {\n                    return 0.0;\n                  }");
                case "tf_half_pixel_for_nn":
                    return "return (".concat(t, "(xResized) + 0.5) / ").concat(t, "(xScale);");
                case "align_corners":
                    return "if (lengthResized == 1) {\n                    return 0.0;\n                  } else {\n                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating\n                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an\n                    // offset-by-one error later in floor().\n                    let whole = ".concat(t, "(xResized * (lengthOriginal - 1) / (lengthResized - 1));\n                    let fract =\n                        ").concat(t, "(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ").concat(t, "(lengthResized - 1);\n                    return whole + fract;\n                  }");
                case "tf_crop_and_resize":
                    return "if (lengthResized > 1) {\n                    return ".concat(t, "(roiStart) * ").concat(t, "(lengthOriginal - 1) +\n                        (").concat(t, "(xResized) * ").concat(t, "(roiEnd - roiStart) * ").concat(t, "(lengthOriginal - 1)) /\n                        ").concat(t, "(lengthResized - 1);\n                  } else {\n                    return 0.5 * ").concat(t, "(roiStart + roiEnd) * ").concat(t, "(lengthOriginal - 1);\n                  }");
                case "half_pixel_symmetric":
                    return "const outputWidth = ".concat(t, "xScale * ").concat(t, "(lengthResized);\n                  const adjustment = ").concat(t, "(lengthResized) / outputWidth;\n                  const center = ").concat(t, "(lengthOriginal) / 2;\n                  const offset = center * (1 - adjustment);\n                  return offset + ((").concat(t, "(xResized) + 0.5) / ").concat(t, "(xScale)) - 0.5;");
                case "half_pixel":
                    return "return ((".concat(t, "(xResized) + 0.5) / ").concat(t, "(xScale)) - 0.5;");
                default:
                    throw new Error("Coordinate transform mode ".concat(e1, " is not supported"));
            }
        })() + "}", Bh = (e1, t, r)=>"fn getNearestPixelFromOriginal(xOriginal: ".concat(r, ", isDownSample: bool) -> ").concat(r, " {") + (()=>{
            switch(e1){
                case "round_prefer_ceil":
                    return "if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";
                case "floor":
                    return "return floor(xOriginal);";
                case "ceil":
                    return "return ceil(xOriginal);";
                case "round_prefer_floor":
                    return "if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";
                case "simple":
                default:
                    if (t < 11) return "if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";
                    throw new Error("Nearest mode ".concat(e1, " is not supported"));
            }
        })() + "}", Mh = (e1, t, r)=>{
        let n = new Array(r).fill(0).concat(new Array(r).fill(1)), o = e1.length === 0 ? n : e1.slice();
        return t.length > 0 ? (t.forEach((i, a)=>{
            n[i] = o[a], n[a + r] = o[t.length + a];
        }), n) : o;
    }, Rh = (e1, t, r, n)=>{
        let o = [];
        if (r.length > 0) if (n.length > 0) {
            if (e1.forEach((i)=>o.push(i)), Math.max(...n) > e1.length) throw new Error("axes is out of bound");
            n.forEach((i, a)=>o[i] = r[a]);
        } else r.forEach((i)=>o.push(i));
        else {
            if (t.length === 0) throw new Error("Resize requires either scales or sizes.");
            o = e1.map((i, a)=>Math.round(i * t[a]));
        }
        return o;
    }, Uh = (e1, t, r)=>{
        let n = (()=>{
            switch(r.keepAspectRatioPolicy){
                case "not_larger":
                    return r.axes.length > 0 ? Math.min(...r.axes.map((i)=>t[i]), Number.MAX_VALUE) : Math.min(...t, Number.MAX_VALUE);
                case "not_smaller":
                    return r.axes.length > 0 ? Math.max(...r.axes.map((i)=>t[i]), Number.MIN_VALUE) : Math.max(...t, Number.MIN_VALUE);
                default:
                    throw new Error("Keep aspect ratio policy ".concat(r.keepAspectRatioPolicy, " is not supported"));
            }
        })();
        t.fill(1, 0, t.length);
        let o = e1.slice();
        return r.axes.length > 0 ? (r.axes.forEach((i)=>t[i] = n), r.axes.forEach((i)=>o[i] = Math.round(e1[i] * t[i]))) : (t.fill(n, 0, t.length), o.forEach((i, a)=>o[a] = Math.round(i * t[a]))), o;
    }, Nh = (e1, t, r, n, o)=>"\n    fn calculateOriginalIndicesFromOutputIndices(output_indices: ".concat(e1.type.indices, ") -> array<").concat(e1.type.value, ", ").concat(r.length, "> {\n      var original_indices: array<").concat(e1.type.value, ", ").concat(r.length, ">;\n      for (var i:u32 = 0; i < ").concat(r.length, "; i++) {\n        var output_index = ").concat(e1.indicesGet("output_indices", "i"), ";\n        var scale = ").concat(F("uniforms.scales", "i", n), ";\n        var roi_low = ").concat(F("uniforms.roi", "i", o), ";\n        var roi_hi = ").concat(F("uniforms.roi", "i + ".concat(t.length), o), ";\n        if (scale == 1.0) {\n          original_indices[i] = ").concat(e1.type.value, "(output_index);\n        } else {\n          var input_shape_i = ").concat(F("uniforms.input_shape", "i", t.length), ";\n          var output_shape_i = ").concat(F("uniforms.output_shape", "i", r.length), ";\n          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,\n                                                                           input_shape_i, roi_low, roi_hi);\n        }\n      }\n      return original_indices;\n    }"), Vh = (e1, t, r, n, o, i, a)=>"\n    fn calculateInputIndicesFromOutputIndices(output_indices: ".concat(t.type.indices, ") -> ").concat(e1.type.indices, " {\n      var input_indices: ").concat(e1.type.indices, ";\n      for (var i:u32 = 0; i < ").concat(n.length, "; i++) {\n        var output_index = ").concat(t.indicesGet("output_indices", "i"), ";\n        var input_index: u32;\n        var scale = ").concat(F("uniforms.scales", "i", o), ";\n        if (scale == 1.0) {\n          input_index = output_index;\n        } else {\n          var roi_low = ").concat(F("uniforms.roi", "i", i), ";\n          var roi_hi = ").concat(F("uniforms.roi", "i + ".concat(r.length), i), ";\n          var input_shape_i = ").concat(F("uniforms.input_shape", "i", r.length), ";\n          var output_shape_i = ").concat(F("uniforms.output_shape", "i", n.length), ";\n          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,\n                                                                        input_shape_i, roi_low, roi_hi);\n          if (!").concat(a, " || (original_idx >= 0 && original_idx < ").concat(t.type.value, "(input_shape_i))) {\n            if (original_idx < 0) {\n              input_index = 0;\n            } else if (original_idx > ").concat(t.type.value, "(input_shape_i - 1)) {\n              input_index = input_shape_i - 1;\n            } else {\n              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));\n            }\n          } else {\n            input_index = u32(original_idx);\n          }\n        }\n        ").concat(e1.indicesSet("input_indices", "i", " input_index"), "\n      }\n      return input_indices;\n    }"), Wh = (e1, t)=>"\n    fn checkInputIndices(input_indices: ".concat(e1.type.indices, ") -> bool {\n      for (var i:u32 = 0; i < ").concat(t.length, "; i++) {\n        var input_index = ").concat(e1.indicesGet("input_indices", "i"), ";\n        if (input_index < 0 || input_index >= ").concat(F("uniforms.input_shape", "i", t.length), ") {\n          return false;\n        }\n      }\n      return true;\n    }"), El = (e1, t, r, n)=>e1.rank > n ? "\n    ".concat(e1.indicesSet("input_indices", t, "channel"), ";\n    ").concat(e1.indicesSet("input_indices", r, "batch"), ";\n") : "", Lh = (e1, t, r, n, o)=>{
        let [a, d, l, p] = r.length === 2 ? [
            -1,
            0,
            1,
            -1
        ] : [
            0,
            2,
            3,
            1
        ], m = e1.type.value;
        return "\n    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ".concat(m, " {\n      var input_indices: ").concat(e1.type.indices, ";\n      ").concat(e1.indicesSet("input_indices", d, "max(0, min(row, ".concat(r[d], " - 1))")), ";\n      ").concat(e1.indicesSet("input_indices", l, "max(0, min(col, ".concat(r[l], " - 1))")), ";\n      ").concat(El(e1, p, a, 2), "\n      return ").concat(e1.getByIndices("input_indices"), ";\n    }\n\n    fn bilinearInterpolation(output_indices: ").concat(t.type.indices, ") -> ").concat(m, " {\n      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);\n      var row:").concat(m, " = originalIndices[").concat(d, "];\n      var col:").concat(m, " = originalIndices[").concat(l, "];\n      ").concat(n ? "if (row < 0 || row > (".concat(r[d], " - 1) || col < 0 || col > (").concat(r[l], " - 1)) {\n        return ").concat(o, ";\n      }") : "", ";\n      row = max(0, min(row, ").concat(r[d], " - 1));\n      col = max(0, min(col, ").concat(r[l], " - 1));\n      var row1: u32 = u32(row);\n      var col1: u32 = u32(col);\n      var row2: u32 = u32(row + 1);\n      var col2: u32 = u32(col + 1);\n      var channel: u32 = ").concat(r.length > 2 ? "u32(originalIndices[".concat(p, "])") : "0", ";\n      var batch: u32 =  ").concat(r.length > 2 ? "u32(originalIndices[".concat(a, "])") : "0", ";\n      var x11: ").concat(m, " = getInputValue(batch, channel, row1, col1);\n      var x12: ").concat(m, " = getInputValue(batch, channel, row1, col2);\n      var x21: ").concat(m, " = getInputValue(batch, channel, row2, col1);\n      var x22: ").concat(m, " = getInputValue(batch, channel, row2, col2);\n      var dx1: ").concat(m, " = abs(row - ").concat(m, "(row1));\n      var dx2: ").concat(m, " = abs(").concat(m, "(row2) - row);\n      var dy1: ").concat(m, " = abs(col - ").concat(m, "(col1));\n      var dy2: ").concat(m, " = abs(").concat(m, "(col2) - col);\n      if (row1 == row2) {\n        dx1 = 0.5;\n        dx2 = 0.5;\n      }\n      if (col1 == col2) {\n        dy1 = 0.5;\n        dy2 = 0.5;\n      }\n      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);\n    }");
    }, Gh = (e1, t, r, n, o, i, a, d, l, p)=>{
        let m = r.length === 2, u = !0, [h, _] = m ? [
            0,
            1
        ] : u ? [
            2,
            3
        ] : [
            1,
            2
        ], y = e1.type.value, g = (x)=>{
            let $ = x === h ? "row" : "col";
            return "\n      fn ".concat($, "CubicInterpolation(input_indices: ").concat(e1.type.indices, ", output_indices: ").concat(t.type.indices, ") -> ").concat(y, " {\n        var output_index = ").concat(t.indicesGet("output_indices", x), ";\n        var originalIdx: ").concat(y, " = getOriginalCoordinateFromResizedCoordinate(output_index, ").concat(o[x], ",\n        ").concat(n[x], ", ").concat(r[x], ", ").concat(i[x], ", ").concat(i[x], " + ").concat(r.length, ");\n        var fractOriginalIdx: ").concat(y, " = originalIdx - floor(originalIdx);\n        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);\n\n        if (").concat(d, " && (originalIdx < 0 || originalIdx > (").concat(r[x], " - 1))) {\n          return ").concat(l, ";\n        }\n        var data: array<").concat(y, ", 4> = array<").concat(y, ", 4>(0.0, 0.0, 0.0, 0.0);\n        for (var i: i32 = -1; i < 3; i++) {\n          var ").concat($, ": ").concat(y, " = originalIdx + ").concat(y, "(i);\n          if (").concat($, " < 0 || ").concat($, " >= ").concat(r[x], ") {\n            ").concat((()=>p ? "coefs[i + 1] = 0.0;\n                        continue;" : d ? "return ".concat(l, ";") : "".concat($, " = max(0, min(").concat($, ", ").concat(r[x], " - 1));"))(), ";\n          }\n        var input_indices_copy: ").concat(e1.type.indices, " = input_indices;\n          ").concat(e1.indicesSet("input_indices_copy", x, "u32(".concat($, ")")), ";\n          data[i + 1] = ").concat(x === h ? e1.getByIndices("input_indices_copy") : "rowCubicInterpolation(input_indices_copy, output_indices)", ";\n        }\n        return cubicInterpolation1D(data, coefs);\n      }");
        };
        return "\n    ".concat(g(h), ";\n    ").concat(g(_), ";\n  fn getCubicInterpolationCoefs(s: ").concat(y, ") -> array<").concat(y, ", 4> {\n    var absS = abs(s);\n    var coeffs: array<").concat(y, ", 4> = array<").concat(y, ", 4>(0.0, 0.0, 0.0, 0.0);\n    var oneMinusAbsS: ").concat(y, " = 1.0 - absS;\n    var twoMinusAbsS: ").concat(y, " = 2.0 - absS;\n    var onePlusAbsS: ").concat(y, " = 1.0 + absS;\n    coeffs[0] = ((").concat(a, " * onePlusAbsS - 5 * ").concat(a, ") * onePlusAbsS + 8 * ").concat(a, ") * onePlusAbsS - 4 * ").concat(a, ";\n    coeffs[1] = ((").concat(a, " + 2) * absS - (").concat(a, " + 3)) * absS * absS + 1;\n    coeffs[2] = ((").concat(a, " + 2) * oneMinusAbsS - (").concat(a, " + 3)) * oneMinusAbsS * oneMinusAbsS + 1;\n    coeffs[3] = ((").concat(a, " * twoMinusAbsS - 5 * ").concat(a, ") * twoMinusAbsS + 8 * ").concat(a, ") * twoMinusAbsS - 4 * ").concat(a, ";\n    return coeffs;\n  }\n\n  fn cubicInterpolation1D(x: array<").concat(y, ", 4>, coefs: array<").concat(y, ", 4>) -> ").concat(y, " {\n    var coefsSum: ").concat(y, " = coefs[0] + coefs[1] + coefs[2] + coefs[3];\n    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;\n  }\n\n  fn bicubicInterpolation(output_indices: ").concat(t.type.indices, ") -> ").concat(y, " {\n    var input_indices: ").concat(e1.type.indices, " = output_indices;\n    return colCubicInterpolation(input_indices, output_indices);\n  }\n    ");
    }, Hh = (e1, t, r, n, o)=>{
        let [a, d, l, p, m] = r.length === 3 ? [
            -1,
            0,
            1,
            2,
            -1
        ] : [
            0,
            2,
            3,
            4,
            1
        ], u = e1.type.value;
        return "\n    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ".concat(u, " {\n      var input_indices: ").concat(e1.type.indices, ";\n      ").concat(e1.indicesSet("input_indices", d, "max(0, min(depth, ".concat(r[d], " - 1))")), ";\n      ").concat(e1.indicesSet("input_indices", l, "max(0, min(height, ".concat(r[l], " - 1))")), ";\n      ").concat(e1.indicesSet("input_indices", p, "max(0, min(width, ".concat(r[p], " - 1))")), ";\n      ").concat(El(e1, m, a, 3), "\n      return ").concat(e1.getByIndices("input_indices"), ";\n    }\n\n    fn trilinearInterpolation(output_indices: ").concat(t.type.indices, ") -> ").concat(u, " {\n      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);\n      var depth:").concat(u, " = originalIndices[").concat(d, "];\n      var height:").concat(u, " = originalIndices[").concat(l, "];\n      var width:").concat(u, " = originalIndices[").concat(p, "];\n      ").concat(n ? "if (depth < 0 || depth > (".concat(r[d], " - 1) || height < 0 || height > (").concat(r[l], " - 1) || width < 0 || (width > ").concat(r[p], " - 1)) {\n      return ").concat(o, ";\n        }") : "", ";\n\n    depth = max(0, min(depth, ").concat(r[d], " - 1));\n      height = max(0, min(height, ").concat(r[l], " - 1));\n      width = max(0, min(width, ").concat(r[p], " - 1));\n      var depth1: u32 = u32(depth);\n      var height1: u32 = u32(height);\n      var width1: u32 = u32(width);\n      var depth2: u32 = u32(depth + 1);\n      var height2: u32 = u32(height + 1);\n      var width2: u32 = u32(width + 1);\n      var channel: u32 = ").concat(r.length > 3 ? "u32(originalIndices[".concat(m, "])") : "0", ";\n      var batch: u32 =  ").concat(r.length > 3 ? "u32(originalIndices[".concat(a, "])") : "0", ";\n\n      var x111: ").concat(u, " = getInputValue(batch, channel, depth1, height1, width1);\n      var x112: ").concat(u, " = getInputValue(batch, channel, depth1, height1, width2);\n      var x121: ").concat(u, " = getInputValue(batch, channel, depth1, height2, width1);\n      var x122: ").concat(u, " = getInputValue(batch, channel, depth1, height2, width2);\n      var x211: ").concat(u, " = getInputValue(batch, channel, depth2, height1, width1);\n      var x212: ").concat(u, " = getInputValue(batch, channel, depth2, height1, width2);\n      var x221: ").concat(u, " = getInputValue(batch, channel, depth2, height2, width1);\n      var x222: ").concat(u, " = getInputValue(batch, channel, depth2, height2, width2);\n      var dx1: ").concat(u, " = abs(depth - ").concat(u, "(depth1));\n      var dx2: ").concat(u, " = abs(").concat(u, "(depth2) - depth);\n      var dy1: ").concat(u, " = abs(height - ").concat(u, "(height1));\n      var dy2: ").concat(u, " = abs(").concat(u, "(height2) - height);\n      var dz1: ").concat(u, " = abs(width - ").concat(u, "(width1));\n      var dz2: ").concat(u, " = abs(").concat(u, "(width2) - width);\n      if (depth1 == depth2) {\n        dx1 = 0.5;\n        dx2 = 0.5;\n      }\n      if (height1 == height2) {\n        dy1 = 0.5;\n        dy2 = 0.5;\n      }\n      if (width1 == width2) {\n        dz1 = 0.5;\n        dz2 = 0.5;\n      }\n      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +\n              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);\n    }");
    }, Fh = (e1, t, r, n, o, i)=>{
        let a = e1.dims, d = Mh(i, t.axes, a.length), l = Rh(a, n, o, t.axes), p = n.slice();
        n.length === 0 && (p = a.map((v, S)=>v === 0 ? 1 : l[S] / v), t.keepAspectRatioPolicy !== "stretch" && (l = Uh(a, p, t)));
        let m = M("output", e1.dataType, l.length), u = E("input", e1.dataType, a.length), h = C.size(l), _ = a.length === l.length && a.every((v, S)=>v === l[S]), y = t.coordinateTransformMode === "tf_crop_and_resize", g = t.extrapolationValue, x = u.type.value, $ = (v)=>"\n      ".concat(_ ? "" : "\n      ".concat(Dh(t.coordinateTransformMode, x), ";\n      ").concat((()=>{
                switch(t.mode){
                    case "nearest":
                        return "\n              ".concat(Wh(u, a), ";\n              ").concat(Bh(t.nearestMode, r, x), ";\n              ").concat(Vh(u, m, a, l, p.length, d.length, y), ";\n              ");
                    case "linear":
                        return "\n              ".concat(Nh(m, a, l, p.length, d.length), ";\n              ").concat((()=>{
                            if (a.length === 2 || a.length === 4) return "".concat(Lh(u, m, a, y, g));
                            if (a.length === 3 || a.length === 5) return "".concat(Hh(u, m, a, y, g));
                            throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.");
                        })(), ";\n            ");
                    case "cubic":
                        return "\n            ".concat((()=>{
                            if (a.length === 2 || a.length === 4) return "".concat(Gh(u, m, a, l, p, d, t.cubicCoeffA, y, t.extrapolationValue, t.excludeOutside));
                            throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.");
                        })(), ";\n            ");
                    default:
                        throw Error("Invalid resize mode");
                }
            })(), ";\n      "), "\n      ").concat(v.registerUniform("output_size", "u32").registerUniform("scales", "f32", p.length).registerUniform("roi", "f32", d.length).declareVariables(u, m), "\n      ").concat(v.mainStart(), "\n        ").concat(v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n        ").concat(_ ? "output[global_idx] = input[global_idx];" : "\n        let output_indices = ".concat(m.offsetToIndices("global_idx"), ";\n        var input_indices: ").concat(u.type.indices, ";\n        ").concat((()=>{
                switch(t.mode){
                    case "nearest":
                        return "input_indices = calculateInputIndicesFromOutputIndices(output_indices);\n                if (checkInputIndices(input_indices)) {\n                  output[global_idx] = ".concat(u.getByIndices("input_indices"), ";\n                } else {\n                  output[global_idx] = ").concat(t.extrapolationValue, ";\n                }");
                    case "linear":
                        return "output[global_idx] = ".concat(a.length === 2 || a.length === 4 ? "bilinearInterpolation" : "trilinearInterpolation", "(output_indices);");
                    case "cubic":
                        return "output[global_idx] = bicubicInterpolation(output_indices);";
                    default:
                        throw Error("Unsupported resize mode: ".concat(t.mode));
                }
            })(), ";\n"), "\n      }");
        return {
            name: "Resize",
            shaderCache: {
                hint: "".concat(t.cacheKey, "|").concat(r, "|").concat(p.length > 0 ? p : "", "|").concat(o.length > 0 ? o : "", "|").concat(d.length > 0 ? d : "", "|").concat(_, "|").concat(a),
                inputDependencies: [
                    "rank"
                ]
            },
            getShaderSource: $,
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: l,
                            dataType: e1.dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(h / 64)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: h
                        },
                        {
                            type: 1,
                            data: p
                        },
                        {
                            type: 1,
                            data: d
                        },
                        ...N(a, l)
                    ]
                })
        };
    }, qh = (e1)=>{
        let t = e1.customDataBuffer;
        return new Uint32Array(t, t.byteOffset, 1)[0];
    }, Pl = (e1, t)=>{
        let r = [], n = [], o = [], i = qh(e1);
        if (t.antialias !== 0) throw Error("Only default value (0) for Antialias attribute is supported");
        Oh(e1.inputs, t, i, r, n, o), e1.compute(Fh(e1.inputs[0], t, i, r, n, o), {
            inputs: [
                0
            ]
        });
    }, zl = (e1)=>{
        let t = e1.antialias, r = e1.axes, n = e1.coordinateTransformMode, o = e1.cubicCoeffA, i = e1.excludeOutside !== 0, a = e1.extrapolationValue, d = e1.keepAspectRatioPolicy, l = e1.mode, p = e1.nearestMode === "" ? "simple" : e1.nearestMode;
        return re({
            antialias: t,
            axes: r,
            coordinateTransformMode: n,
            cubicCoeffA: o,
            excludeOutside: i,
            extrapolationValue: a,
            keepAspectRatioPolicy: d,
            mode: l,
            nearestMode: p
        });
    };
});
var Kh, jh, Dl, Bl = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Kh = (e1, t)=>{
        let [r, n, o, i] = e1, { numHeads: a, rotaryEmbeddingDim: d } = t;
        if (r.dims.length !== 3 && r.dims.length !== 4) throw new Error("Input 'x' is expected to have 3 or 4 dimensions, got ".concat(r.dims.length));
        if (!C.areEqual(n.dims, []) && !C.areEqual(n.dims, [
            1
        ]) && n.dims.length !== 2) throw new Error("Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ".concat(n.dims.length));
        if (o.dims.length !== 2) throw new Error("Input 'cos_cache' is expected to have 2 dimensions, got ".concat(o.dims.length));
        if (i.dims.length !== 2) throw new Error("Input 'sin_cache' is expected to have 2 dimensions, got ".concat(i.dims.length));
        if (!C.areEqual(o.dims, i.dims)) throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");
        if (d > 0 && a === 0) throw new Error("num_heads must be provided if rotary_embedding_dim is specified");
        let l = r.dims[0], p = r.dims[r.dims.length - 2], m = o.dims[0], u = C.sizeFromDimension(r.dims, 1) / p, h = d === 0 ? o.dims[1] * 2 : u / a;
        if (d > h) throw new Error("rotary_embedding_dim must be less than or equal to head_size");
        if (n.dims.length === 2) {
            if (l !== n.dims[0]) throw new Error("Input 'position_ids' dimension 0 should be of size batch_size, got ".concat(n.dims[0]));
            if (p !== n.dims[1]) throw new Error("Input 'position_ids' dimension 1 should be of size sequence_length, got ".concat(n.dims[1]));
        }
        if (h / 2 !== o.dims[1] && d / 2 !== o.dims[1]) throw new Error("Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ".concat(o.dims[1]));
        if (p > m) throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");
    }, jh = (e1, t)=>{
        let { interleaved: r, numHeads: n, rotaryEmbeddingDim: o, scale: i } = t, a = e1[0].dims[0], d = C.sizeFromDimension(e1[0].dims, 1), l = e1[0].dims[e1[0].dims.length - 2], p = d / l, m = e1[2].dims[1], u = o === 0 ? m * 2 : p / n, h = new Array(a, l, p / u, u - m), _ = C.computeStrides(h), y = [
            {
                type: 1,
                data: i
            },
            {
                type: 12,
                data: h
            },
            {
                type: 12,
                data: _
            },
            ...e1[0].dims.length === 3 ? new Array({
                type: 12,
                data: [
                    d,
                    p,
                    u,
                    1
                ]
            }) : [],
            ...e1[0].dims.length === 4 ? new Array({
                type: 12,
                data: [
                    d,
                    u,
                    l * u,
                    1
                ]
            }) : [],
            ...N(e1[0].dims, e1[1].dims, e1[2].dims, e1[3].dims, e1[0].dims)
        ], g = (x)=>{
            let $ = E("input", e1[0].dataType, e1[0].dims.length), v = E("position_ids", e1[1].dataType, e1[1].dims.length), S = E("cos_cache", e1[2].dataType, e1[2].dims.length), T = E("sin_cache", e1[3].dataType, e1[3].dims.length), A = M("output", e1[0].dataType, e1[0].dims.length);
            return x.registerUniforms([
                {
                    name: "scale",
                    type: "f32"
                },
                {
                    name: "global_shape",
                    type: "u32",
                    length: h.length
                },
                {
                    name: "global_strides",
                    type: "u32",
                    length: _.length
                },
                {
                    name: "input_output_strides",
                    type: "u32",
                    length: _.length
                }
            ]), "\n        ".concat(x.declareVariables($, v, S, T, A), "\n\n        ").concat(x.mainStart(kt), "\n          let half_rotary_emb_dim = uniforms.").concat(S.name, "_shape[1];\n          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;\n          let size = uniforms.global_shape[0] * uniforms.global_strides[0];\n          ").concat(x.guardAgainstOutOfBoundsWorkgroupSizes("size"), "\n\n          if (bsnh[3] < half_rotary_emb_dim) {\n            let position_ids_idx =\n                ").concat(v.broadcastedIndicesToOffset("bsnh.xy", M("", v.type.tensor, 2)), ";\n            let position_id =\n                u32(").concat(v.getByOffset("position_ids_idx"), ") + select(0, bsnh[1], position_ids_idx == 0);\n            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ").concat(r, ");\n            let j = i + select(half_rotary_emb_dim, 1, ").concat(r, ");\n            let re = ").concat($.getByOffset("i"), " * ").concat(S.get("position_id", "bsnh[3]"), " -\n                ").concat($.getByOffset("j"), " * ").concat(T.get("position_id", "bsnh[3]"), ";\n            ").concat(A.setByOffset("i", "re"), "\n            let im = ").concat($.getByOffset("i"), " * ").concat(T.get("position_id", "bsnh[3]"), " +\n                ").concat($.getByOffset("j"), " * ").concat(S.get("position_id", "bsnh[3]"), ";\n            ").concat(A.setByOffset("j", "im"), "\n          } else {\n            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;\n            ").concat(A.setByOffset("k", $.getByOffset("k")), "\n          }\n        }");
        };
        return {
            name: "RotaryEmbedding",
            shaderCache: {
                hint: re({
                    interleaved: r
                }).cacheKey,
                inputDependencies: [
                    "rank",
                    "rank",
                    "rank",
                    "rank"
                ]
            },
            getShaderSource: g,
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: e1[0].dims,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(C.size(h) / kt)
                    },
                    programUniforms: y
                })
        };
    }, Dl = (e1, t)=>{
        Kh(e1.inputs, t), e1.compute(jh(e1.inputs, t));
    };
});
var Yh, Zh, Ml, Rl = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    Yh = (e1)=>{
        if (!e1 || e1.length < 3) throw new Error("layerNorm requires at least 3 inputs.");
        let t = e1[0], r = e1[1], n = e1[2];
        if (t.dataType !== r.dataType || t.dataType !== n.dataType) throw new Error("All inputs must have the same data type");
        if (t.dims.length !== 3 && t.dims.length !== 2) throw new Error("Input must be 2D or 3D");
        if (r.dims.length !== 3 && r.dims.length !== 2) throw new Error("Skip must be 2D or 3D");
        let o = t.dims[t.dims.length - 1], i = t.dims[t.dims.length - 2];
        if (r.dims[r.dims.length - 1] !== o) throw new Error("Skip must have the same hidden size as input");
        if (r.dims[r.dims.length - 2] !== i) throw new Error("Skip must have the same sequence length as input");
        if (n.dims.length !== 1) throw new Error("Gamma must be 1D");
        if (n.dims[n.dims.length - 1] !== o) throw new Error("Gamma must have the same hidden size as input");
        if (e1.length > 3) {
            let a = e1[3];
            if (a.dims.length !== 1) throw new Error("Beta must be 1D");
            if (a.dims[a.dims.length - 1] !== o) throw new Error("Beta must have the same hidden size as input");
        }
        if (e1.length > 4) {
            let a = e1[4];
            if (a.dims.length !== 1) throw new Error("Bias must be 1D");
            if (a.dims[a.dims.length - 1] !== o) throw new Error("Bias must have the same hidden size as input");
        }
    }, Zh = (e1, t, r, n)=>{
        let o = t.simplified, i = e1[0].dims, a = C.size(i), d = i, l = a, p = i.slice(-1)[0], m = n ? i.slice(0, -1).concat(1) : [], u = !o && e1.length > 3, h = e1.length > 4, _ = n && r > 1, y = n && r > 2, g = r > 3, x = 64, $ = me(p), v = [
            {
                type: 12,
                data: l
            },
            {
                type: 12,
                data: $
            },
            {
                type: 12,
                data: p
            },
            {
                type: 1,
                data: t.epsilon
            }
        ], S = (A)=>{
            let k = [
                {
                    name: "output_size",
                    type: "u32"
                },
                {
                    name: "components",
                    type: "u32"
                },
                {
                    name: "hidden_size",
                    type: "u32"
                },
                {
                    name: "epsilon",
                    type: "f32"
                }
            ], P = [
                E("x", e1[0].dataType, e1[0].dims, $),
                E("skip", e1[1].dataType, e1[1].dims, $),
                E("gamma", e1[2].dataType, e1[2].dims, $)
            ];
            u && P.push(E("beta", e1[3].dataType, e1[3].dims, $)), h && P.push(E("bias", e1[4].dataType, e1[4].dims, $)), P.push(M("output", e1[0].dataType, d, $)), _ && P.push(M("mean_output", 1, m)), y && P.push(M("inv_std_output", 1, m)), g && P.push(M("input_skip_bias_sum", e1[0].dataType, d, $));
            let D = _e(e1[0].dataType), R = _e(1, $);
            return "\n\n      ".concat(A.registerUniforms(k).declareVariables(...P), "\n      var<workgroup> sum_shared : array<").concat(R, ", ").concat(x, ">;\n      var<workgroup> sum_squared_shared : array<").concat(R, ", ").concat(x, ">;\n\n      ").concat(A.mainStart([
                x,
                1,
                1
            ]), "\n        let ix = local_id.x;\n        let iy = global_id.x / ").concat(x, ";\n\n        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;\n        var stride = hidden_size_vectorized / ").concat(x, ";\n        let offset = ix * stride + iy * hidden_size_vectorized;\n        let offset1d = stride * ix;\n        if (ix == ").concat(x - 1, ") {\n          stride = hidden_size_vectorized - stride * ix;\n        }\n        for (var i: u32 = 0; i < stride; i++) {\n          let skip_value = skip[offset + i];\n          let bias_value = ").concat(h ? "bias[offset1d + i]" : D + "(0.0)", ";\n          let input_value = x[offset + i];\n          let value = input_value + skip_value + bias_value;\n          ").concat(g ? "input_skip_bias_sum[offset + i] = value;" : "", "\n          output[offset + i] = value;\n          let f32_value = ").concat(Et(D, $, "value"), ";\n          sum_shared[ix] += f32_value;\n          sum_squared_shared[ix] += f32_value * f32_value;\n        }\n        workgroupBarrier();\n\n        var reduce_size : u32 = ").concat(x, ";\n        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {\n          reduce_size = curr_size + (reduce_size & 1);\n          if (ix < curr_size) {\n            sum_shared[ix] += sum_shared[ix + reduce_size];\n            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];\n          }\n          workgroupBarrier();\n        }\n\n        let sum = sum_shared[0];\n        let square_sum = sum_squared_shared[0];\n        let mean = ").concat(Fe("sum", $), " / f32(uniforms.hidden_size);\n        let inv_std_dev = inverseSqrt(").concat(Fe("square_sum", $), " / f32(uniforms.hidden_size) ").concat(o ? "" : "- mean * mean", " + uniforms.epsilon);\n        ").concat(_ ? "mean_output[global_idx] = mean;" : "", "\n        ").concat(y ? "inv_std_output[global_idx] = inv_std_dev;" : "", "\n\n        for (var i: u32 = 0; i < stride; i++) {\n          output[offset + i] = (output[offset + i] ").concat(o ? "" : "- ".concat(D, "(mean)"), ") *\n            ").concat(D, "(inv_std_dev) * gamma[offset1d + i]\n            ").concat(u ? "+ beta[offset1d + i]" : "", ";\n        }\n      }");
        }, T = [
            {
                dims: d,
                dataType: e1[0].dataType
            }
        ];
        return r > 1 && T.push({
            dims: m,
            dataType: 1
        }), r > 2 && T.push({
            dims: m,
            dataType: 1
        }), r > 3 && T.push({
            dims: i,
            dataType: e1[0].dataType
        }), {
            name: "SkipLayerNormalization",
            shaderCache: {
                hint: "".concat($, ";").concat(_, ";").concat(y, ";").concat(g),
                inputDependencies: e1.map((A, k)=>"type")
            },
            getShaderSource: S,
            getRunData: ()=>({
                    outputs: T,
                    dispatchGroup: {
                        x: Math.ceil(l / p)
                    },
                    programUniforms: v
                })
        };
    }, Ml = (e1, t)=>{
        Yh(e1.inputs);
        let n = [
            0
        ];
        e1.outputCount > 1 && n.push(-3), e1.outputCount > 2 && n.push(-3), e1.outputCount > 3 && n.push(3), e1.compute(Zh(e1.inputs, t, e1.outputCount, !1), {
            outputs: n
        });
    };
});
var Qh, rn, Xh, Ul, Jh, eg, Nl, Vl, Wl = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    ae();
    Qh = (e1, t)=>{
        if (!e1 || e1.length < 1) throw new Error("too few inputs");
        if (t.axes.length !== 0) {
            if (t.axes.length !== t.starts.length || t.axes.length !== t.ends.length) throw new Error("axes, starts and ends must have the same length");
        } else if (t.starts.length !== t.ends.length) throw new Error("starts and ends must have the same length");
        e1.slice(1).forEach((r, n)=>{
            if (e1[n + 1].dataType !== 6 && e1[n + 1].dataType !== 7) throw new Error("Input ".concat(n, " must be an array of int32 or int64"));
        });
    }, rn = (e1, t)=>{
        let r = [];
        if (e1.length > t) if (e1[t].dataType === 7) e1[t].getBigInt64Array().forEach((n)=>r.push(Number(n)));
        else if (e1[t].dataType === 6) e1[t].getInt32Array().forEach((n)=>r.push(Number(n)));
        else throw new Error("Input ".concat(t, " must be an array of int32 or int64"));
        return r;
    }, Xh = (e1, t)=>{
        if (e1.length > 1) {
            let r = rn(e1, 1), n = rn(e1, 2), o = rn(e1, 3);
            return o.length === 0 && (o = [
                ...Array(e1[0].dims.length).keys()
            ]), re({
                starts: r,
                ends: n,
                axes: o
            });
        } else return t;
    }, Ul = (e1, t, r, n, o)=>{
        let i = e1;
        return e1 < 0 && (i += r[n[t]]), o[t] < 0 ? Math.max(0, Math.min(i, r[n[t]] - 1)) : Math.max(0, Math.min(i, r[n[t]]));
    }, Jh = (e1, t, r)=>"fn calculateInputIndices(output_indices: ".concat(t.type.indices, ") -> ").concat(e1.type.indices, " {\n          var input_indices: ").concat(e1.type.indices, ";\n          var carry = 0u;\n          for (var i = ").concat(r.length, "; i >= 0; i--) {\n            let input_shape_i = ").concat(F("uniforms.input_shape", "i", r.length), ";\n            let steps_i = ").concat(F("uniforms.steps", "i", r.length), ";\n            let signs_i = ").concat(F("uniforms.signs", "i", r.length), ";\n            let starts_i = ").concat(F("uniforms.starts", "i", r.length), ";\n            var output_index = ").concat(t.indicesGet("output_indices", "i"), ";\n            var input_index = output_index * steps_i + starts_i + carry;\n            carry = input_index / input_shape_i;\n            input_index = input_index % input_shape_i;\n            if (signs_i < 0) {\n              input_index = input_shape_i - input_index - 1u + starts_i;\n            }\n            ").concat(e1.indicesSet("input_indices", "i", "input_index"), ";\n          }\n          return input_indices;\n      }"), eg = (e1, t)=>{
        let r = e1[0].dims, n = C.size(r), o = t.axes.length > 0 ? C.normalizeAxes(t.axes, r.length) : [
            ...Array(r.length).keys()
        ], i = rn(e1, 4);
        i.forEach(($)=>$ !== 0 || (()=>{
                throw new Error("step cannot be 0");
            })), i.length === 0 && (i = Array(o.length).fill(1));
        let a = t.starts.map(($, v)=>Ul($, v, r, o, i)), d = t.ends.map(($, v)=>Ul($, v, r, o, i));
        if (o.length !== a.length || o.length !== d.length) throw new Error("start, ends and axes should have the same number of elements");
        if (o.length !== r.length) for(let $ = 0; $ < r.length; ++$)o.includes($) || (a.splice($, 0, 0), d.splice($, 0, r[$]), i.splice($, 0, 1));
        let l = i.map(($)=>Math.sign($));
        i.forEach(($, v, S)=>{
            if ($ < 0) {
                let T = (d[v] - a[v]) / $, A = a[v], k = A + T * i[v];
                a[v] = k, d[v] = A, S[v] = -$;
            }
        });
        let p = r.slice(0);
        o.forEach(($, v)=>{
            p[$] = Math.ceil((d[$] - a[$]) / i[$]);
        });
        let m = {
            dims: p,
            dataType: e1[0].dataType
        }, u = M("output", e1[0].dataType, p.length), h = E("input", e1[0].dataType, e1[0].dims.length), _ = C.size(p), y = [
            {
                name: "outputSize",
                type: "u32"
            },
            {
                name: "starts",
                type: "u32",
                length: a.length
            },
            {
                name: "signs",
                type: "i32",
                length: l.length
            },
            {
                name: "steps",
                type: "u32",
                length: i.length
            }
        ], g = [
            {
                type: 12,
                data: _
            },
            {
                type: 12,
                data: a
            },
            {
                type: 6,
                data: l
            },
            {
                type: 12,
                data: i
            },
            ...N(e1[0].dims, p)
        ], x = ($)=>"\n      ".concat($.registerUniforms(y).declareVariables(h, u), "\n        ").concat(Jh(h, u, r), "\n        ").concat($.mainStart(), "\n          ").concat($.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize"), "\n          let output_indices = ").concat(u.offsetToIndices("global_idx"), ";\n          let input_indices = calculateInputIndices(output_indices);\n          ").concat(u.setByOffset("global_idx", h.getByIndices("input_indices")), "\n      }");
        return {
            name: "Slice",
            shaderCache: {
                hint: "".concat(l.length, "_").concat(a.length, "_").concat(i.length),
                inputDependencies: [
                    "rank"
                ]
            },
            getShaderSource: x,
            getRunData: ()=>({
                    outputs: [
                        m
                    ],
                    dispatchGroup: {
                        x: Math.ceil(n / 64)
                    },
                    programUniforms: g
                })
        };
    }, Nl = (e1, t)=>{
        Qh(e1.inputs, t);
        let r = Xh(e1.inputs, t);
        e1.compute(eg(e1.inputs, r), {
            inputs: [
                0
            ]
        });
    }, Vl = (e1)=>{
        let t = e1.starts, r = e1.ends, n = e1.axes;
        return re({
            starts: t,
            ends: r,
            axes: n
        });
    };
});
var tg, rg, Ll, Gl, Hl = U(()=>{
    "use strict";
    te();
    oe();
    Se();
    dt();
    ae();
    tg = (e1)=>{
        if (!e1 || e1.length !== 1) throw new Error("Softmax op requires 1 input.");
    }, rg = (e1, t)=>{
        let r = e1.inputs[0], n = r.dims, o = C.size(n), i = n.length, a = C.normalizeAxis(t.axis, i), d = a < n.length - 1, l, p = [];
        d ? (p = Array.from({
            length: i
        }, (P, D)=>D), p[a] = i - 1, p[i - 1] = a, l = e1.compute(Pe(r, p), {
            inputs: [
                r
            ],
            outputs: [
                -1
            ]
        })[0]) : l = r;
        let m = l.dims, u = m[i - 1], h = o / u, _ = me(u), y = u / _, g = 64;
        h === 1 && (g = 256);
        let x = (P, D)=>D === 4 ? "max(max(".concat(P, ".x, ").concat(P, ".y), max(").concat(P, ".z, ").concat(P, ".w))") : D === 2 ? "max(".concat(P, ".x, ").concat(P, ".y)") : D === 3 ? "max(max(".concat(P, ".x, ").concat(P, ".y), ").concat(P, ".z)") : P, $ = E("x", l.dataType, l.dims, _), v = M("result", l.dataType, l.dims, _), S = $.type.value, T = _e(l.dataType) === "f32" ? "var threadMax = ".concat(S, "(-3.402823e+38f);") : "var threadMax = ".concat(S, "(-65504.0h);"), A = (P)=>"\n      var<workgroup> rowMaxShared : ".concat(S, ";\n      var<workgroup> rowSumShared : ").concat(S, ";\n      var<workgroup> threadShared : array<").concat(S, ", ").concat(g, ">;\n\n      fn getValue(row: i32, col: i32, row_stride: i32) -> ").concat(S, " {\n        let index = row * row_stride + col;\n        return x[index];\n      }\n\n      fn setValue(row: i32, col: i32, row_stride: i32, value: ").concat(S, ") {\n        let index = row * row_stride + col;\n        result[index] = value;\n      }\n      ").concat(P.registerUniform("packedCols", "i32").declareVariables($, v), "\n      ").concat(P.mainStart(g), "\n        let gindex = i32(global_idx);\n        let lindex = i32(local_idx);\n        const wg = ").concat(g, ";\n        let row = gindex / wg;\n        let cols = uniforms.packedCols;\n        let row_stride : i32 = uniforms.packedCols;\n\n        // find the rows max\n        ").concat(T, "\n        for (var col = lindex; col < cols; col += wg) {\n          let value = getValue(row, col, row_stride);\n          threadMax = max(threadMax, value);\n        }\n        if (lindex < cols) {\n          threadShared[lindex] = threadMax;\n        }\n        workgroupBarrier();\n\n        var reduceSize = min(cols, wg);\n        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {\n          reduceSize = currSize + (reduceSize & 1);\n          if (lindex < currSize) {\n            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);\n          }\n          workgroupBarrier();\n        }\n        if (lindex == 0) {\n          rowMaxShared = ").concat(S, "(").concat(x("threadShared[0]", _), ");\n        }\n        workgroupBarrier();\n\n        // find the rows sum\n        var threadSum = ").concat(S, "(0.0);\n        for (var col = lindex; col < cols; col += wg) {\n          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);\n          threadSum += subExp;\n        }\n        threadShared[lindex] = threadSum;\n        workgroupBarrier();\n\n        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {\n          if (lindex < currSize) {\n            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];\n          }\n          workgroupBarrier();\n        }\n        if (lindex == 0) {\n          rowSumShared = ").concat(S, "(").concat(Fe("threadShared[0]", _), ");\n        }\n        workgroupBarrier();\n\n        // calculate final value for each element in the row\n        for (var col = lindex; col < cols; col += wg) {\n          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;\n          setValue(row, col, row_stride, value);\n        }\n      }"), k = e1.compute({
            name: "Softmax",
            shaderCache: {
                hint: "".concat(_, ";").concat(g),
                inputDependencies: [
                    "type"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: m,
                            dataType: l.dataType
                        }
                    ],
                    dispatchGroup: {
                        x: h
                    },
                    programUniforms: [
                        {
                            type: 6,
                            data: y
                        }
                    ]
                }),
            getShaderSource: A
        }, {
            inputs: [
                l
            ],
            outputs: [
                d ? -1 : 0
            ]
        })[0];
        d && e1.compute(Pe(k, p), {
            inputs: [
                k
            ]
        });
    }, Ll = (e1, t)=>{
        tg(e1.inputs), rg(e1, t);
    }, Gl = (e1)=>re({
            axis: e1.axis
        });
});
var Fl, ng, og, ig, ql, Kl = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    Fl = (e1)=>Array.from(e1.getBigInt64Array(), Number), ng = (e1)=>{
        if (!e1 || e1.length !== 2) throw new Error("Tile requires 2 inputs.");
        if (e1[0].dataType !== 1 && e1[0].dataType !== 10 && e1[0].dataType !== 6 && e1[0].dataType !== 12) throw new Error("Tile only support float, float16, int32, and uint32 data types");
        if (e1[1].dataType !== 7) throw new Error("Tile `repeats` input should be of int64 data type");
        if (e1[1].dims.length !== 1) throw new Error("Tile `repeats` input should be 1-D");
        if (Fl(e1[1]).length !== e1[0].dims.length) throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor");
    }, og = (e1, t)=>{
        let r = [];
        for(let n = 0; n < e1.length; ++n)r.push(e1[n] * t[n]);
        return r;
    }, ig = (e1, t)=>{
        let r = e1[0].dims, n = t !== null && t !== void 0 ? t : Fl(e1[1]), o = og(r, n), i = C.size(o), a = e1[0].dataType, d = E("input", a, r.length), l = M("output", a, o.length), p = (m)=>"\n      const inputShape = ".concat(d.indices(...r), ";\n      ").concat(m.registerUniform("output_size", "u32").declareVariables(d, l), "\n      ").concat(m.mainStart(), "\n      ").concat(m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size"), "\n      let output_indices = ").concat(l.offsetToIndices("global_idx"), ";\n      var input_indices: ").concat(d.type.indices, ";\n      for (var i = 0; i < ").concat(r.length, "; i++) {\n        let input_dim_i = ").concat(d.indicesGet("uniforms.input_shape", "i"), ";\n        let input_dim_value = ").concat(l.indicesGet("output_indices", "i"), "  % input_dim_i;\n\n        ").concat(d.indicesSet("input_indices", "i", "input_dim_value"), "\n      }\n      ").concat(l.setByOffset("global_idx", d.getByIndices("input_indices")), "\n    }");
        return {
            name: "Tile",
            shaderCache: {
                hint: "".concat(n),
                inputDependencies: [
                    "rank"
                ]
            },
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: o,
                            dataType: e1[0].dataType
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(i / 64)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: i
                        },
                        ...N(e1[0].dims, o)
                    ]
                }),
            getShaderSource: p
        };
    }, ql = (e1)=>{
        ng(e1.inputs), e1.compute(ig(e1.inputs), {
            inputs: [
                0
            ]
        });
    };
});
var ag, sg, jl, Yl = U(()=>{
    "use strict";
    te();
    oe();
    ae();
    ag = (e1, t, r, n, o)=>{
        let i = M("output_data", o, r.length, 4), a = E("a_data", t[1].dataType, t[1].dims.length, 4), d = E("b_data", t[2].dataType, t[2].dims.length, 4), l = E("c_data", t[0].dataType, t[0].dims.length, 4), p, m = (u, h, _)=>"select(".concat(h, ", ").concat(u, ", ").concat(_, ")");
        if (!n) p = i.setByOffset("global_idx", m(a.getByOffset("global_idx"), d.getByOffset("global_idx"), l.getByOffset("global_idx")));
        else {
            let u = function(h, _) {
                let y = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
                let g = "a_data[index_a".concat(_, "][component_a").concat(_, "]"), x = "b_data[index_b".concat(_, "][component_b").concat(_, "]"), $ = "bool(c_data[index_c".concat(_, "] & (0xffu << (component_c").concat(_, " * 8)))");
                return "\n            let output_indices".concat(_, " = ").concat(i.offsetToIndices("global_idx * 4u + ".concat(_, "u")), ";\n            let offset_a").concat(_, " = ").concat(a.broadcastedIndicesToOffset("output_indices".concat(_), i), ";\n            let offset_b").concat(_, " = ").concat(d.broadcastedIndicesToOffset("output_indices".concat(_), i), ";\n            let offset_c").concat(_, " = ").concat(l.broadcastedIndicesToOffset("output_indices".concat(_), i), ";\n            let index_a").concat(_, " = offset_a").concat(_, " / 4u;\n            let index_b").concat(_, " = offset_b").concat(_, " / 4u;\n            let index_c").concat(_, " = offset_c").concat(_, " / 4u;\n            let component_a").concat(_, " = offset_a").concat(_, " % 4u;\n            let component_b").concat(_, " = offset_b").concat(_, " % 4u;\n            let component_c").concat(_, " = offset_c").concat(_, " % 4u;\n            ").concat(h, "[").concat(_, "] = ").concat(y, "(").concat(m(g, x, $), ");\n          ");
            };
            o === 9 ? p = "\n            var data = vec4<u32>(0);\n            ".concat(u("data", 0, "u32"), "\n            ").concat(u("data", 1, "u32"), "\n            ").concat(u("data", 2, "u32"), "\n            ").concat(u("data", 3, "u32"), "\n            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));") : p = "\n            ".concat(u("output_data[global_idx]", 0), "\n            ").concat(u("output_data[global_idx]", 1), "\n            ").concat(u("output_data[global_idx]", 2), "\n            ").concat(u("output_data[global_idx]", 3), "\n          ");
        }
        return "\n        ".concat(e1.registerUniform("vec_size", "u32").declareVariables(l, a, d, i), "\n        ").concat(e1.mainStart(), "\n        ").concat(e1.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size"), "\n        ").concat(p, "\n      }");
    }, sg = (e1)=>{
        let t = e1[1].dims, r = e1[2].dims, n = e1[0].dims, o = e1[1].dataType, i = !(C.areEqual(t, r) && C.areEqual(r, n)), a = t, d = C.size(t);
        if (i) {
            let p = tt.calcShape(tt.calcShape(t, r, !1), n, !1);
            if (!p) throw new Error("Can't perform where op on the given tensors");
            a = p, d = C.size(a);
        }
        let l = Math.ceil(d / 4);
        return {
            name: "Where",
            shaderCache: {
                inputDependencies: [
                    "rank",
                    "rank",
                    "rank"
                ]
            },
            getShaderSource: (p)=>ag(p, e1, a, i, o),
            getRunData: ()=>({
                    outputs: [
                        {
                            dims: a,
                            dataType: o
                        }
                    ],
                    dispatchGroup: {
                        x: Math.ceil(d / 64 / 4)
                    },
                    programUniforms: [
                        {
                            type: 12,
                            data: l
                        },
                        ...N(n, t, r, a)
                    ]
                })
        };
    }, jl = (e1)=>{
        e1.compute(sg(e1.inputs));
    };
});
var Zl, Ql = U(()=>{
    "use strict";
    Ps();
    Fr();
    Ds();
    Ms();
    vu();
    zu();
    Bu();
    Qu();
    od();
    sd();
    ld();
    hd();
    yd();
    wd();
    xd();
    Id();
    kd();
    zd();
    Bd();
    Ud();
    qd();
    Yd();
    Qd();
    Jd();
    rl();
    So();
    ol();
    vl();
    Sl();
    Il();
    kl();
    Gr();
    Ol();
    Bl();
    Rl();
    Wl();
    Hl();
    Io();
    Kl();
    dt();
    Kr();
    Yl();
    Zl = new Map([
        [
            "Abs",
            [
                Rs
            ]
        ],
        [
            "Acos",
            [
                Us
            ]
        ],
        [
            "Acosh",
            [
                Ns
            ]
        ],
        [
            "Add",
            [
                $u
            ]
        ],
        [
            "ArgMax",
            [
                Es,
                co
            ]
        ],
        [
            "ArgMin",
            [
                ks,
                co
            ]
        ],
        [
            "Asin",
            [
                Vs
            ]
        ],
        [
            "Asinh",
            [
                Ws
            ]
        ],
        [
            "Atan",
            [
                Ls
            ]
        ],
        [
            "Atanh",
            [
                Gs
            ]
        ],
        [
            "Attention",
            [
                zs
            ]
        ],
        [
            "AveragePool",
            [
                pl,
                cl
            ]
        ],
        [
            "BatchNormalization",
            [
                Os
            ]
        ],
        [
            "BiasAdd",
            [
                Bs
            ]
        ],
        [
            "BiasSplitGelu",
            [
                wu
            ]
        ],
        [
            "Cast",
            [
                Fs,
                Hs
            ]
        ],
        [
            "Ceil",
            [
                Ks
            ]
        ],
        [
            "Clip",
            [
                qs
            ]
        ],
        [
            "Concat",
            [
                Ou,
                Du
            ]
        ],
        [
            "Conv",
            [
                wo,
                _o
            ]
        ],
        [
            "ConvTranspose",
            [
                nd,
                td
            ]
        ],
        [
            "Cos",
            [
                js
            ]
        ],
        [
            "Cosh",
            [
                Ys
            ]
        ],
        [
            "CumSum",
            [
                id,
                ad
            ]
        ],
        [
            "DepthToSpace",
            [
                ud,
                dd
            ]
        ],
        [
            "DequantizeLinear",
            [
                $l,
                xl
            ]
        ],
        [
            "Div",
            [
                xu
            ]
        ],
        [
            "Einsum",
            [
                md,
                fd
            ]
        ],
        [
            "Elu",
            [
                Zs,
                Xt
            ]
        ],
        [
            "Equal",
            [
                Su
            ]
        ],
        [
            "Erf",
            [
                Qs
            ]
        ],
        [
            "Exp",
            [
                Xs
            ]
        ],
        [
            "Expand",
            [
                bd
            ]
        ],
        [
            "FastGelu",
            [
                _d
            ]
        ],
        [
            "Floor",
            [
                Js
            ]
        ],
        [
            "FusedConv",
            [
                wo,
                _o
            ]
        ],
        [
            "Gather",
            [
                $d,
                vd
            ]
        ],
        [
            "GatherElements",
            [
                Pd,
                Ed
            ]
        ],
        [
            "GatherBlockQuantized",
            [
                Cd,
                Ad
            ]
        ],
        [
            "GatherND",
            [
                Sd,
                Td
            ]
        ],
        [
            "Gelu",
            [
                eu
            ]
        ],
        [
            "Gemm",
            [
                Dd,
                Od
            ]
        ],
        [
            "GlobalAveragePool",
            [
                hl,
                fl
            ]
        ],
        [
            "GlobalMaxPool",
            [
                wl,
                _l
            ]
        ],
        [
            "Greater",
            [
                Au
            ]
        ],
        [
            "GreaterOrEqual",
            [
                Eu
            ]
        ],
        [
            "GridSample",
            [
                Md,
                Rd
            ]
        ],
        [
            "GroupQueryAttention",
            [
                Fd
            ]
        ],
        [
            "HardSigmoid",
            [
                uu,
                su
            ]
        ],
        [
            "InstanceNormalization",
            [
                jd
            ]
        ],
        [
            "LayerNormalization",
            [
                Zd
            ]
        ],
        [
            "LeakyRelu",
            [
                tu,
                Xt
            ]
        ],
        [
            "Less",
            [
                ku
            ]
        ],
        [
            "LessOrEqual",
            [
                Pu
            ]
        ],
        [
            "Log",
            [
                bu
            ]
        ],
        [
            "MatMul",
            [
                Xd
            ]
        ],
        [
            "MatMulNBits",
            [
                el,
                tl
            ]
        ],
        [
            "MaxPool",
            [
                bl,
                yl
            ]
        ],
        [
            "Mul",
            [
                Tu
            ]
        ],
        [
            "MultiHeadAttention",
            [
                Wd,
                Vd
            ]
        ],
        [
            "Neg",
            [
                nu
            ]
        ],
        [
            "Not",
            [
                ru
            ]
        ],
        [
            "Pad",
            [
                nl
            ]
        ],
        [
            "Pow",
            [
                Iu
            ]
        ],
        [
            "QuickGelu",
            [
                yu,
                Xt
            ]
        ],
        [
            "Range",
            [
                Tl
            ]
        ],
        [
            "Reciprocal",
            [
                ou
            ]
        ],
        [
            "ReduceMin",
            [
                xs
            ]
        ],
        [
            "ReduceMean",
            [
                ys
            ]
        ],
        [
            "ReduceMax",
            [
                $s
            ]
        ],
        [
            "ReduceSum",
            [
                Ts
            ]
        ],
        [
            "ReduceProd",
            [
                Ss
            ]
        ],
        [
            "ReduceL1",
            [
                _s
            ]
        ],
        [
            "ReduceL2",
            [
                ws
            ]
        ],
        [
            "ReduceLogSum",
            [
                Cs
            ]
        ],
        [
            "ReduceLogSumExp",
            [
                vs
            ]
        ],
        [
            "ReduceSumSquare",
            [
                Is
            ]
        ],
        [
            "Relu",
            [
                iu
            ]
        ],
        [
            "Resize",
            [
                Pl,
                zl
            ]
        ],
        [
            "RotaryEmbedding",
            [
                Dl
            ]
        ],
        [
            "ScatterND",
            [
                Al,
                Cl
            ]
        ],
        [
            "Sigmoid",
            [
                au
            ]
        ],
        [
            "Sin",
            [
                du
            ]
        ],
        [
            "Sinh",
            [
                lu
            ]
        ],
        [
            "Slice",
            [
                Nl,
                Vl
            ]
        ],
        [
            "SkipLayerNormalization",
            [
                Ml
            ]
        ],
        [
            "Split",
            [
                Ld,
                Gd
            ]
        ],
        [
            "Sqrt",
            [
                cu
            ]
        ],
        [
            "Softmax",
            [
                Ll,
                Gl
            ]
        ],
        [
            "Sub",
            [
                Cu
            ]
        ],
        [
            "Tan",
            [
                pu
            ]
        ],
        [
            "Tanh",
            [
                fu
            ]
        ],
        [
            "ThresholdedRelu",
            [
                gu,
                Xt
            ]
        ],
        [
            "Tile",
            [
                ql
            ]
        ],
        [
            "Transpose",
            [
                is,
                as
            ]
        ],
        [
            "Where",
            [
                jl
            ]
        ]
    ]);
});
var nn, Xl = U(()=>{
    "use strict";
    We();
    et();
    ae();
    nn = class {
        getArtifact(t) {
            return this.repo.get(t);
        }
        setArtifact(t, r) {
            this.repo.set(t, r);
        }
        run(t, r, n, o, i) {
            Ue(t.programInfo.name);
            let a = this.backend.device, d = this.backend.getComputePassEncoder();
            this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2);
            let l = [];
            for (let m of r)l.push({
                binding: l.length,
                resource: {
                    buffer: m.buffer
                }
            });
            for (let m of n)l.push({
                binding: l.length,
                resource: {
                    buffer: m.buffer
                }
            });
            i && l.push({
                binding: l.length,
                resource: i
            });
            let p = a.createBindGroup({
                layout: t.computePipeline.getBindGroupLayout(0),
                entries: l,
                label: t.programInfo.name
            });
            if (this.backend.sessionStatus === "capturing") {
                let m = {
                    kernelId: this.backend.currentKernelId,
                    computePipeline: t.computePipeline,
                    bindGroup: p,
                    dispatchGroup: o
                };
                this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m);
            }
            d.setPipeline(t.computePipeline), d.setBindGroup(0, p), d.dispatchWorkgroups(...o), this.backend.writeTimestamp(this.backend.pendingDispatchNumber * 2 + 1), this.backend.pendingDispatchNumber++, (this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber || this.backend.queryType === "at-passes") && this.backend.endComputePass(), this.backend.pendingDispatchNumber >= this.backend.maxDispatchNumber && this.backend.flush(), De(t.programInfo.name);
        }
        dispose() {}
        build(t, r) {
            Ue(t.name);
            let n = this.backend.device, o = [];
            [
                {
                    feature: "shader-f16",
                    extension: "f16"
                },
                {
                    feature: "subgroups",
                    extension: "subgroups"
                },
                {
                    feature: "subgroups-f16",
                    extension: "subgroups_f16"
                }
            ].forEach((u)=>{
                n.features.has(u.feature) && o.push("enable ".concat(u.extension, ";"));
            });
            let a = ns(r, this.backend.device.limits), d = t.getShaderSource(a), l = "".concat(o.join("\n"), "\n").concat(a.additionalImplementations, "\n").concat(d), p = n.createShaderModule({
                code: l,
                label: t.name
            });
            ue("verbose", ()=>"[WebGPU] ".concat(t.name, " shader code: ").concat(l));
            let m = n.createComputePipeline({
                compute: {
                    module: p,
                    entryPoint: "main"
                },
                layout: "auto",
                label: t.name
            });
            return De(t.name), {
                programInfo: t,
                computePipeline: m,
                uniformVariablesInfo: a.variablesInfo
            };
        }
        normalizeDispatchGroupSize(t) {
            let r = typeof t == "number" ? t : t.x, n = typeof t == "number" ? 1 : t.y || 1, o = typeof t == "number" ? 1 : t.z || 1, i = this.backend.device.limits.maxComputeWorkgroupsPerDimension;
            if (r <= i && n <= i && o <= i) return [
                r,
                n,
                o
            ];
            let a = r * n * o, d = Math.ceil(Math.sqrt(a));
            if (d > i) {
                if (d = Math.ceil(Math.cbrt(a)), d > i) throw new Error("Total dispatch size exceeds WebGPU maximum.");
                return [
                    d,
                    d,
                    d
                ];
            } else return [
                d,
                d,
                1
            ];
        }
        constructor(t){
            this.backend = t;
            this.repo = new Map, this.attributesBound = !1;
        }
    };
});
var ug, dg, Co, Ao, on, Jl = U(()=>{
    "use strict";
    We();
    te();
    et();
    Jn();
    Ja();
    Ql();
    Xl();
    ug = (e1, t)=>{
        if (t.length !== e1.length) throw new Error("inputDependencies length ".concat(t.length, " is not equal to inputTensors length ").concat(e1.length, "."));
        let r = [];
        for(let n = 0; n < e1.length; ++n){
            let o = e1[n].dataType;
            switch(t[n]){
                case "none":
                    {
                        r.push("");
                        break;
                    }
                case "type":
                    {
                        r.push("".concat(o));
                        break;
                    }
                case "rank":
                    {
                        let i = e1[n].dims.length;
                        r.push("".concat(o, ";").concat(i));
                        break;
                    }
                case "dims":
                    {
                        let i = e1[n].dims.join(",");
                        r.push("".concat(o, ";").concat(i));
                        break;
                    }
                default:
                    throw new Error("unsupported input dependency: ".concat(t[n]));
            }
        }
        return r.join("|");
    }, dg = (e1, t, r)=>{
        var _e_shaderCache, _e_shaderCache1;
        let n = e1.name;
        var _e_shaderCache_inputDependencies;
        return ((_e_shaderCache = e1.shaderCache) === null || _e_shaderCache === void 0 ? void 0 : _e_shaderCache.hint) && (n += "[" + e1.shaderCache.hint + "]"), n += ":" + r + ":".concat(ug(t, (_e_shaderCache_inputDependencies = (_e_shaderCache1 = e1.shaderCache) === null || _e_shaderCache1 === void 0 ? void 0 : _e_shaderCache1.inputDependencies) !== null && _e_shaderCache_inputDependencies !== void 0 ? _e_shaderCache_inputDependencies : new Array(t.length).fill("dims"))), n;
    }, Co = class {
        isArchitecture(t) {
            return this.architecture === t;
        }
        isVendor(t) {
            return this.vendor === t;
        }
        constructor(t){
            t && (this.architecture = t.architecture, this.vendor = t.vendor);
        }
    }, Ao = class {
        constructor(t){
            this.subgroupsSupported = t.features.has("subgroups"), this.subgroupsF16Supported = t.features.has("subgroups");
            let r = t.limits;
            !this.subgroupsSupported || !r.minSubgroupSize || !r.maxSubgroupSize ? this.subgroupSizeRange = void 0 : this.subgroupSizeRange = [
                r.minSubgroupSize,
                r.maxSubgroupSize
            ];
        }
    }, on = class {
        get currentKernelCustomData() {
            if (this.currentKernelId === null) throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");
            let t = this.kernelCustomData.get(this.currentKernelId);
            return t || (t = {}, this.kernelCustomData.set(this.currentKernelId, t)), t;
        }
        async initialize(t, r) {
            this.env = t;
            let n = [], o = {
                requiredLimits: {
                    maxComputeWorkgroupStorageSize: r.limits.maxComputeWorkgroupStorageSize,
                    maxComputeWorkgroupsPerDimension: r.limits.maxComputeWorkgroupsPerDimension,
                    maxStorageBufferBindingSize: r.limits.maxStorageBufferBindingSize,
                    maxBufferSize: r.limits.maxBufferSize,
                    maxComputeInvocationsPerWorkgroup: r.limits.maxComputeInvocationsPerWorkgroup,
                    maxComputeWorkgroupSizeX: r.limits.maxComputeWorkgroupSizeX,
                    maxComputeWorkgroupSizeY: r.limits.maxComputeWorkgroupSizeY,
                    maxComputeWorkgroupSizeZ: r.limits.maxComputeWorkgroupSizeZ
                },
                requiredFeatures: n
            }, i = (a)=>r.features.has(a) && n.push(a) && !0;
            i("chromium-experimental-timestamp-query-inside-passes") || i("timestamp-query"), i("shader-f16"), i("subgroups") && i("subgroups-f16"), this.device = await r.requestDevice(o), this.deviceInfo = new Ao(this.device), this.adapterInfo = new Co(r.info || await r.requestAdapterInfo()), this.gpuDataManager = Xa(this), this.programManager = new nn(this), this.kernels = new Map, this.kernelPersistentData = new Map, this.kernelCustomData = new Map, Rr(t.logLevel, !!t.debug), this.device.onuncapturederror = (a)=>{
                a.error instanceof GPUValidationError && console.error("An uncaught WebGPU validation error was raised: ".concat(a.error.message));
            }, Object.defineProperty(this.env.webgpu, "device", {
                value: this.device,
                writable: !1,
                enumerable: !0,
                configurable: !1
            }), Object.defineProperty(this.env.webgpu, "adapter", {
                value: r,
                writable: !1,
                enumerable: !0,
                configurable: !1
            }), this.setQueryType();
        }
        dispose() {
            typeof this.querySet < "u" && this.querySet.destroy(), this.gpuDataManager.dispose();
        }
        getCommandEncoder() {
            return this.commandEncoder || (this.commandEncoder = this.device.createCommandEncoder()), this.commandEncoder;
        }
        getComputePassEncoder() {
            if (!this.computePassEncoder) {
                let t = this.getCommandEncoder(), r = {};
                this.queryType === "at-passes" && (r.timestampWrites = {
                    querySet: this.querySet,
                    beginningOfPassWriteIndex: this.pendingDispatchNumber * 2,
                    endOfPassWriteIndex: this.pendingDispatchNumber * 2 + 1
                }), this.computePassEncoder = t.beginComputePass(r);
            }
            return this.computePassEncoder;
        }
        endComputePass() {
            this.computePassEncoder && (this.computePassEncoder.end(), this.computePassEncoder = null);
        }
        flush() {
            if (!this.commandEncoder) return;
            Ue(), this.endComputePass();
            let t;
            this.queryType !== "none" && (this.commandEncoder.resolveQuerySet(this.querySet, 0, this.pendingDispatchNumber * 2, this.queryResolveBuffer, 0), t = this.device.createBuffer({
                size: this.pendingDispatchNumber * 2 * 8,
                usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
            }), this.pendingQueries.set(t, this.pendingKernels), this.pendingKernels = [], this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer, 0, t, 0, this.pendingDispatchNumber * 2 * 8)), this.device.queue.submit([
                this.commandEncoder.finish()
            ]), this.gpuDataManager.refreshPendingBuffers(), this.commandEncoder = null, this.pendingDispatchNumber = 0, this.queryType !== "none" && t.mapAsync(GPUMapMode.READ).then(()=>{
                let r = new BigUint64Array(t.getMappedRange()), n = this.pendingQueries.get(t);
                for(let o = 0; o < r.length / 2; o++){
                    var _this_env_webgpu_profiling;
                    let i = n[o], a = i.kernelId, d = this.kernels.get(a), l = d.kernelType, p = d.kernelName, m = i.programName, u = i.inputTensorViews, h = i.outputTensorViews, _ = r[o * 2], y = r[o * 2 + 1];
                    typeof this.queryTimeBase > "u" && (this.queryTimeBase = _);
                    let g = Number(_ - this.queryTimeBase), x = Number(y - this.queryTimeBase);
                    if (!Number.isSafeInteger(g) || !Number.isSafeInteger(x)) throw new RangeError("incorrect timestamp range");
                    if ((_this_env_webgpu_profiling = this.env.webgpu.profiling) === null || _this_env_webgpu_profiling === void 0 ? void 0 : _this_env_webgpu_profiling.ondata) this.env.webgpu.profiling.ondata({
                        version: 1,
                        inputsMetadata: u.map(($)=>({
                                dims: $.dims,
                                dataType: bt($.dataType)
                            })),
                        outputsMetadata: h.map(($)=>({
                                dims: $.dims,
                                dataType: bt($.dataType)
                            })),
                        kernelId: a,
                        kernelType: l,
                        kernelName: p,
                        programName: m,
                        startTime: g,
                        endTime: x
                    });
                    else {
                        let $ = "";
                        u.forEach((S, T)=>{
                            $ += "input[".concat(T, "]: [").concat(S.dims, "] | ").concat(bt(S.dataType), ", ");
                        });
                        let v = "";
                        h.forEach((S, T)=>{
                            v += "output[".concat(T, "]: [").concat(S.dims, "] | ").concat(bt(S.dataType), ", ");
                        }), console.log('[profiling] kernel "'.concat(a, "|").concat(l, "|").concat(p, "|").concat(m, '" ').concat($).concat(v, "execution time: ").concat(x - g, " ns"));
                    }
                    wr("GPU", "".concat(m, "::").concat(_, "::").concat(y));
                }
                t.unmap(), this.pendingQueries.delete(t);
            }), De();
        }
        run(t, r, n, o, i, a) {
            Ue(t.name);
            let d = [];
            for(let S = 0; S < r.length; ++S){
                let T = r[S].data;
                if (T === 0) continue;
                let A = this.gpuDataManager.get(T);
                if (!A) throw new Error("no GPU data for input: ".concat(T));
                d.push(A);
            }
            let { outputs: l, dispatchGroup: p, programUniforms: m } = t.getRunData(r), u = n.length === 0 ? l.map((S, T)=>T) : n;
            if (u.length !== l.length) throw new Error("Output size ".concat(u.length, " must be equal to ").concat(l.length, "."));
            let h = [], _ = [];
            for(let S = 0; S < l.length; ++S){
                if (!Number.isInteger(u[S]) || u[S] < -3 || u[S] >= a) throw new Error("Invalid output index: ".concat(u[S]));
                if (u[S] === -3) continue;
                let T = u[S] === -1, A = u[S] === -2, k = T || A ? i(l[S].dataType, l[S].dims) : o(u[S], l[S].dataType, l[S].dims);
                if (h.push(k), k.data === 0) continue;
                let P = this.gpuDataManager.get(k.data);
                if (!P) throw new Error("no GPU data for output: ".concat(k.data));
                if (T && this.temporaryData.push(P), A) {
                    let D = this.kernelPersistentData.get(this.currentKernelId);
                    D || (D = [], this.kernelPersistentData.set(this.currentKernelId, D)), D.push(P);
                }
                _.push(P);
            }
            if (d.length !== r.length || _.length !== h.length) {
                if (_.length === 0) return De(t.name), h;
                throw new Error("Program ".concat(t.name, " has zero-sized tensor(s) in inputs or outputs. This is not supported now."));
            }
            let y;
            if (m) {
                let S = 0, T = [];
                m.forEach((D)=>{
                    let R = typeof D.data == "number" ? [
                        D.data
                    ] : D.data;
                    if (R.length === 0) return;
                    let G = D.type === 10 ? 2 : 4, K, j;
                    D.type === 10 ? (j = R.length > 4 ? 16 : R.length > 2 ? 8 : R.length * G, K = R.length > 4 ? 16 : G * R.length) : (j = R.length <= 2 ? R.length * G : 16, K = 16), S = Math.ceil(S / j) * j, T.push(S);
                    let V = D.type === 10 ? 8 : 4;
                    S += R.length > 4 ? Math.ceil(R.length / V) * K : R.length * G;
                });
                let A = 16;
                S = Math.ceil(S / A) * A;
                let k = new ArrayBuffer(S);
                m.forEach((D, R)=>{
                    let G = T[R], K = typeof D.data == "number" ? [
                        D.data
                    ] : D.data;
                    if (D.type === 6) new Int32Array(k, G, K.length).set(K);
                    else if (D.type === 12) new Uint32Array(k, G, K.length).set(K);
                    else if (D.type === 10) new Uint16Array(k, G, K.length).set(K);
                    else if (D.type === 1) new Float32Array(k, G, K.length).set(K);
                    else throw new Error("Unsupported uniform type: ".concat(bt(D.type)));
                });
                let P = this.gpuDataManager.create(S, GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM);
                this.device.queue.writeBuffer(P.buffer, 0, k, 0, S), this.gpuDataManager.release(P.id), y = {
                    offset: 0,
                    size: S,
                    buffer: P.buffer
                };
            }
            let g = this.programManager.normalizeDispatchGroupSize(p), x = g[1] === 1 && g[2] === 1, $ = dg(t, r, x), v = this.programManager.getArtifact($);
            if (v || (v = this.programManager.build(t, g), this.programManager.setArtifact($, v), ue("info", ()=>"[artifact] key: ".concat($, ", programName: ").concat(t.name))), m && v.uniformVariablesInfo) {
                if (m.length !== v.uniformVariablesInfo.length) throw new Error("Uniform variables count mismatch: expect ".concat(v.uniformVariablesInfo.length, ", got ").concat(m.length, ' in program "').concat(v.programInfo.name, '".'));
                for(let S = 0; S < m.length; S++){
                    let T = m[S], A = T.type, k = typeof T.data == "number" ? 1 : T.data.length, [P, D] = v.uniformVariablesInfo[S];
                    if (A !== P || k !== D) throw new Error("Uniform variable ".concat(S, " mismatch: expect type ").concat(P, " with size ").concat(D, ", got type ").concat(A, " with size ").concat(k, ' in program "').concat(v.programInfo.name, '".'));
                }
            }
            if (ue("info", ()=>'[ProgramManager] run "'.concat(t.name, '" (key=').concat($, ") with ").concat(g[0], "x").concat(g[1], "x").concat(g[2])), this.queryType !== "none" || this.sessionStatus === "capturing") {
                let S = {
                    kernelId: this.currentKernelId,
                    programName: v.programInfo.name,
                    inputTensorViews: r,
                    outputTensorViews: h
                };
                this.pendingKernels.push(S), this.sessionStatus === "capturing" && this.capturedPendingKernels.get(this.currentSessionId).push(S);
            }
            return this.programManager.run(v, d, _, g, y), De(t.name), h;
        }
        upload(t, r) {
            this.gpuDataManager.upload(t, r);
        }
        memcpy(t, r) {
            this.gpuDataManager.memcpy(t, r);
        }
        async download(t, r) {
            await this.gpuDataManager.download(t, r);
        }
        alloc(t) {
            return this.gpuDataManager.create(t).id;
        }
        free(t) {
            return this.gpuDataManager.release(t);
        }
        createKernel(t, r, n, o) {
            let i = Zl.get(t);
            if (!i) throw new Error("kernel not implemented: ".concat(t));
            let a = {
                kernelType: t,
                kernelName: o,
                kernelEntry: i[0],
                attributes: [
                    i[1],
                    n
                ]
            };
            this.kernels.set(r, a);
        }
        releaseKernel(t) {
            let r = this.kernelPersistentData.get(t);
            if (r) {
                for (let n of r)this.gpuDataManager.release(n.id);
                this.kernelPersistentData.delete(t);
            }
            this.kernelCustomData.delete(t), this.kernels.delete(t);
        }
        computeKernel(t, r, n) {
            let o = this.kernels.get(t);
            if (!o) throw new Error("kernel not created: ".concat(t));
            let i = o.kernelType, a = o.kernelName, d = o.kernelEntry, l = o.attributes;
            if (this.currentKernelId !== null) throw new Error('kernel "['.concat(i, "] ").concat(a, '" is not allowed to be called recursively'));
            this.currentKernelId = t, l[0] && (l[1] = l[0](l[1]), l[0] = void 0), ue("info", ()=>'[WebGPU] Start to run kernel "['.concat(i, "] ").concat(a, '"...'));
            let p = this.env.debug;
            this.temporaryData = [];
            try {
                return p && this.device.pushErrorScope("validation"), d(r, l[1]), 0;
            } catch (m) {
                return n.push(Promise.resolve('[WebGPU] Kernel "['.concat(i, "] ").concat(a, '" failed. ').concat(m))), 1;
            } finally{
                p && n.push(this.device.popErrorScope().then((m)=>m ? 'GPU validation error for kernel "['.concat(i, "] ").concat(a, '": ').concat(m.message) : null));
                for (let m of this.temporaryData)this.gpuDataManager.release(m.id);
                this.temporaryData = [], this.currentKernelId = null;
            }
        }
        registerBuffer(t, r, n, o) {
            let i = this.sessionExternalDataMapping.get(t);
            i || (i = new Map, this.sessionExternalDataMapping.set(t, i));
            let a = i.get(r), d = this.gpuDataManager.registerExternalBuffer(n, o, a);
            return i.set(r, [
                d,
                n
            ]), d;
        }
        unregisterBuffers(t) {
            let r = this.sessionExternalDataMapping.get(t);
            r && (r.forEach((n)=>this.gpuDataManager.unregisterExternalBuffer(n[0])), this.sessionExternalDataMapping.delete(t));
        }
        getBuffer(t) {
            let r = this.gpuDataManager.get(t);
            if (!r) throw new Error("no GPU data for buffer: ".concat(t));
            return r.buffer;
        }
        createDownloader(t, r, n) {
            return async ()=>{
                let o = await no(this, t, r);
                return Ur(o.buffer, n);
            };
        }
        writeTimestamp(t) {
            this.queryType === "inside-passes" && this.computePassEncoder.writeTimestamp(this.querySet, t);
        }
        setQueryType() {
            var _this_env_webgpu_profiling;
            this.queryType = "none", (((_this_env_webgpu_profiling = this.env.webgpu.profiling) === null || _this_env_webgpu_profiling === void 0 ? void 0 : _this_env_webgpu_profiling.mode) === "default" || (typeof this.env.trace > "u" ? this.env.wasm.trace : this.env.trace)) && (this.device.features.has("chromium-experimental-timestamp-query-inside-passes") ? this.queryType = "inside-passes" : this.device.features.has("timestamp-query") && (this.queryType = "at-passes"), this.queryType !== "none" && typeof this.querySet > "u" && (this.querySet = this.device.createQuerySet({
                type: "timestamp",
                count: this.maxDispatchNumber * 2
            }), this.queryResolveBuffer = this.device.createBuffer({
                size: this.maxDispatchNumber * 2 * 8,
                usage: GPUBufferUsage.COPY_SRC | GPUBufferUsage.QUERY_RESOLVE
            })));
        }
        captureBegin() {
            ue("info", "captureBegin"), this.capturedCommandList.get(this.currentSessionId) || this.capturedCommandList.set(this.currentSessionId, []), this.capturedPendingKernels.get(this.currentSessionId) || this.capturedPendingKernels.set(this.currentSessionId, []), this.flush(), this.sessionStatus = "capturing";
        }
        captureEnd() {
            ue("info", "captureEnd"), this.flush(), this.sessionStatus = "default";
        }
        replay() {
            ue("info", "replay"), this.sessionStatus = "replaying";
            let t = this.capturedCommandList.get(this.currentSessionId), r = this.capturedPendingKernels.get(this.currentSessionId), n = t.length;
            this.pendingKernels = [];
            for(let o = 0; o < n; o++){
                let i = this.getComputePassEncoder(), a = t[o];
                this.writeTimestamp(this.pendingDispatchNumber * 2), i.setPipeline(a.computePipeline), i.setBindGroup(0, a.bindGroup), i.dispatchWorkgroups(...a.dispatchGroup), this.writeTimestamp(this.pendingDispatchNumber * 2 + 1), this.pendingDispatchNumber++, this.queryType !== "none" && this.pendingKernels.push(r[o]), (this.pendingDispatchNumber >= this.maxDispatchNumber || this.queryType === "at-passes") && this.endComputePass(), this.pendingDispatchNumber >= this.maxDispatchNumber && this.flush();
            }
            this.flush(), this.sessionStatus = "default";
        }
        onCreateSession() {
            this.gpuDataManager.onCreateSession();
        }
        onReleaseSession(t) {
            this.unregisterBuffers(t), this.capturedCommandList.has(t) && this.capturedCommandList.delete(t), this.capturedPendingKernels.has(t) && this.capturedPendingKernels.delete(t), this.gpuDataManager.onReleaseSession(t);
        }
        onRunStart(t) {
            this.currentSessionId = t, this.setQueryType();
        }
        constructor(){
            this.currentSessionId = null;
            this.currentKernelId = null;
            this.commandEncoder = null;
            this.computePassEncoder = null;
            this.maxDispatchNumber = 16;
            this.pendingDispatchNumber = 0;
            this.pendingKernels = [];
            this.pendingQueries = new Map;
            this.sessionStatus = "default";
            this.capturedCommandList = new Map;
            this.capturedPendingKernels = new Map;
            this.sessionExternalDataMapping = new Map;
        }
    };
});
var lg, ec, cg, tc, an, sn, ko, rc, nc = U(()=>{
    "use strict";
    et();
    lg = 1, ec = ()=>lg++, cg = new Map([
        [
            "float32",
            32
        ],
        [
            "float16",
            16
        ],
        [
            "int32",
            32
        ],
        [
            "uint32",
            32
        ],
        [
            "int64",
            64
        ],
        [
            "uint64",
            64
        ],
        [
            "int8",
            8
        ],
        [
            "uint8",
            8
        ],
        [
            "int4",
            4
        ],
        [
            "uint4",
            4
        ]
    ]), tc = (e1, t)=>{
        let r = cg.get(e1);
        if (!r) throw new Error("Unsupported data type.");
        return t.length > 0 ? Math.ceil(t.reduce((n, o)=>n * o) * r / 8) : 0;
    }, an = class {
        get tensor() {
            return this.mlTensor;
        }
        get type() {
            return this.dataType;
        }
        get shape() {
            return this.tensorShape;
        }
        get byteLength() {
            return tc(this.dataType, this.tensorShape);
        }
        destroy() {
            ue("verbose", ()=>"[WebNN] TensorWrapper.destroy"), this.mlTensor.destroy();
        }
        write(t) {
            this.mlContext.writeTensor(this.mlTensor, t);
        }
        async read(t) {
            return t ? this.mlContext.readTensor(this.mlTensor, t) : this.mlContext.readTensor(this.mlTensor);
        }
        canReuseTensor(t, r, n) {
            return this.mlContext === t && this.dataType === r && this.tensorShape.length === n.length && this.tensorShape.every((o, i)=>o === n[i]);
        }
        constructor(t){
            this.sessionId = t.sessionId, this.mlContext = t.context, this.mlTensor = t.tensor, this.dataType = t.dataType, this.tensorShape = t.shape;
        }
    }, sn = class {
        get tensorWrapper() {
            return this.wrapper;
        }
        releaseTensor() {
            this.tensorWrapper && (this.tensorManager.releaseTensor(this.tensorWrapper), this.wrapper = void 0);
        }
        async ensureTensor(t, r, n, o) {
            if (this.wrapper) {
                if (this.wrapper.canReuseTensor(t, r, n)) return this.wrapper.tensor;
                if (o) {
                    if (this.wrapper.byteLength !== tc(r, n)) throw new Error("Unable to copy data to tensor with different size.");
                    this.activeUpload = new Uint8Array(await this.wrapper.read());
                }
                this.tensorManager.releaseTensor(this.wrapper);
            }
            let i = typeof MLTensorUsage > "u" ? void 0 : MLTensorUsage.READ | MLTensorUsage.WRITE;
            return this.wrapper = await this.tensorManager.getCachedTensor(r, n, i, !0, !0), o && this.activeUpload && (this.wrapper.write(this.activeUpload), this.activeUpload = void 0), this.wrapper.tensor;
        }
        upload(t) {
            if (this.wrapper) if (t.byteLength === this.wrapper.byteLength) {
                this.wrapper.write(t);
                return;
            } else ue("verbose", ()=>"Data size does not match tensor size. Releasing tensor."), this.releaseTensor();
            this.activeUpload ? this.activeUpload.set(t) : this.activeUpload = new Uint8Array(t);
        }
        async download(t) {
            if (this.activeUpload) if (t) {
                t instanceof ArrayBuffer ? new Uint8Array(t).set(this.activeUpload) : new Uint8Array(t.buffer, t.byteOffset, t.byteLength).set(this.activeUpload);
                return;
            } else return this.activeUpload.buffer;
            if (!this.wrapper) throw new Error("Tensor has not been created.");
            return t ? this.wrapper.read(t) : this.wrapper.read();
        }
        constructor(t, r){
            this.tensorManager = t;
            this.wrapper = r;
        }
    }, ko = class {
        reserveTensorId() {
            let t = ec();
            return this.tensorTrackersById.set(t, new sn(this)), t;
        }
        releaseTensorId(t) {
            let r = this.tensorTrackersById.get(t);
            r && (this.tensorTrackersById.delete(t), r.tensorWrapper && this.releaseTensor(r.tensorWrapper));
        }
        async ensureTensor(t, r, n, o) {
            ue("verbose", ()=>"[WebNN] TensorManager.ensureTensor {tensorId: ".concat(t, ", dataType: ").concat(r, ", shape: ").concat(n, ", copyOld: ").concat(o, "}"));
            let i = this.tensorTrackersById.get(t);
            if (!i) throw new Error("Tensor not found.");
            return i.ensureTensor(this.backend.currentContext, r, n, o);
        }
        upload(t, r) {
            let n = this.tensorTrackersById.get(t);
            if (!n) throw new Error("Tensor not found.");
            n.upload(r);
        }
        async download(t, r) {
            ue("verbose", ()=>"[WebNN] TensorManager.download {tensorId: ".concat(t, ", dstBuffer: ").concat(r === null || r === void 0 ? void 0 : r.byteLength, "}"));
            let n = this.tensorTrackersById.get(t);
            if (!n) throw new Error("Tensor not found.");
            return n.download(r);
        }
        releaseTensorsForSession(t) {
            for (let r of this.freeTensors)r.sessionId === t && r.destroy();
            this.freeTensors = this.freeTensors.filter((r)=>r.sessionId !== t);
        }
        registerTensor(t, r, n, o) {
            let i = ec(), a = new an({
                sessionId: this.backend.currentSessionId,
                context: t,
                tensor: r,
                dataType: n,
                shape: o
            });
            return this.tensorTrackersById.set(i, new sn(this, a)), this.externalTensors.add(a), i;
        }
        async getCachedTensor(t, r, n, o, i) {
            let a = this.backend.currentSessionId, d = this.backend.currentContext;
            for (let [p, m] of this.freeTensors.entries())if (m.canReuseTensor(d, t, r)) {
                ue("verbose", ()=>"[WebNN] Reusing tensor {dataType: ".concat(t, ", shape: ").concat(r, "}"));
                let u = this.freeTensors.splice(p, 1)[0];
                return u.sessionId = a, u;
            }
            ue("verbose", ()=>"[WebNN] MLContext.createTensor {dataType: ".concat(t, ", shape: ").concat(r, "}"));
            let l = await d.createTensor({
                dataType: t,
                shape: r,
                dimensions: r,
                usage: n,
                writable: o,
                readable: i
            });
            return new an({
                sessionId: a,
                context: d,
                tensor: l,
                dataType: t,
                shape: r
            });
        }
        releaseTensor(t) {
            this.externalTensors.has(t) && this.externalTensors.delete(t), this.freeTensors.push(t);
        }
        constructor(t){
            this.backend = t;
            this.tensorTrackersById = new Map;
            this.freeTensors = [];
            this.externalTensors = new Set;
        }
    }, rc = function() {
        for(var _len = arguments.length, e1 = new Array(_len), _key = 0; _key < _len; _key++){
            e1[_key] = arguments[_key];
        }
        return new ko(...e1);
    };
});
var oc, pg, un, ic = U(()=>{
    "use strict";
    te();
    gt();
    Jn();
    nc();
    et();
    oc = new Map([
        [
            1,
            "float32"
        ],
        [
            10,
            "float16"
        ],
        [
            6,
            "int32"
        ],
        [
            12,
            "uint32"
        ],
        [
            7,
            "int64"
        ],
        [
            13,
            "uint64"
        ],
        [
            22,
            "int4"
        ],
        [
            21,
            "uint4"
        ],
        [
            3,
            "int8"
        ],
        [
            2,
            "uint8"
        ],
        [
            9,
            "uint8"
        ]
    ]), pg = (e1, t)=>{
        if (e1 === t) return !0;
        if (e1 === void 0 || t === void 0) return !1;
        let r = Object.keys(e1).sort(), n = Object.keys(t).sort();
        return r.length === n.length && r.every((o, i)=>o === n[i] && e1[o] === t[o]);
    }, un = class {
        get currentSessionId() {
            if (this.activeSessionId === void 0) throw new Error("No active session");
            return this.activeSessionId;
        }
        onRunStart(t) {
            this.activeSessionId = t;
        }
        async createMLContext(t) {
            if (t instanceof GPUDevice) {
                let n = this.mlContextCache.findIndex((o)=>o.gpuDevice === t);
                if (n !== -1) return this.mlContextCache[n].mlContext;
                {
                    let o = await navigator.ml.createContext(t);
                    return this.mlContextCache.push({
                        gpuDevice: t,
                        mlContext: o
                    }), o;
                }
            } else if (t === void 0) {
                let n = this.mlContextCache.findIndex((o)=>o.options === void 0 && o.gpuDevice === void 0);
                if (n !== -1) return this.mlContextCache[n].mlContext;
                {
                    let o = await navigator.ml.createContext();
                    return this.mlContextCache.push({
                        mlContext: o
                    }), o;
                }
            }
            let r = this.mlContextCache.findIndex((n)=>pg(n.options, t));
            if (r !== -1) return this.mlContextCache[r].mlContext;
            {
                let n = await navigator.ml.createContext(t);
                return this.mlContextCache.push({
                    options: t,
                    mlContext: n
                }), n;
            }
        }
        get currentContext() {
            let t = this.getMLContext(this.currentSessionId);
            if (!t) throw new Error("No MLContext found for session ".concat(this.currentSessionId));
            return t;
        }
        registerMLContext(t, r) {
            this.mlContextBySessionId.set(t, r);
            let n = this.sessionIdsByMLContext.get(r);
            n || (n = new Set, this.sessionIdsByMLContext.set(r, n)), n.add(t);
        }
        onReleaseSession(t) {
            let r = this.mlContextBySessionId.get(t);
            if (!r) return;
            this.tensorManager.releaseTensorsForSession(t), this.mlContextBySessionId.delete(t);
            let n = this.sessionIdsByMLContext.get(r);
            if (n.delete(t), n.size === 0) {
                this.sessionIdsByMLContext.delete(r);
                let o = this.mlContextCache.findIndex((i)=>i.mlContext === r);
                o !== -1 && this.mlContextCache.splice(o, 1);
            }
        }
        getMLContext(t) {
            return this.mlContextBySessionId.get(t);
        }
        reserveTensorId() {
            return this.tensorManager.reserveTensorId();
        }
        releaseTensorId(t) {
            ue("verbose", ()=>"[WebNN] releaseTensorId {tensorId: ".concat(t, "}")), this.tensorManager.releaseTensorId(t);
        }
        async ensureTensor(t, r, n, o) {
            let i = oc.get(r);
            if (!i) throw new Error("Unsupported ONNX data type: ".concat(r));
            return this.tensorManager.ensureTensor(t, i, n, o);
        }
        uploadTensor(t, r) {
            if (!Ie().shouldTransferToMLTensor) throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");
            ue("verbose", ()=>"[WebNN] uploadTensor {tensorId: ".concat(t, ", data: ").concat(r.byteLength, "}")), this.tensorManager.upload(t, r);
        }
        async downloadTensor(t, r) {
            return this.tensorManager.download(t, r);
        }
        createMLTensorDownloader(t, r) {
            return async ()=>{
                let n = await this.tensorManager.download(t);
                return Ur(n, r);
            };
        }
        registerMLTensor(t, r, n) {
            let o = oc.get(r);
            if (!o) throw new Error("Unsupported ONNX data type: ".concat(r));
            let i = this.tensorManager.registerTensor(this.currentContext, t, o, n);
            return ue("verbose", ()=>"[WebNN] registerMLTensor {tensor: ".concat(t, ", dataType: ").concat(o, ", dimensions: ").concat(n, "} -> {tensorId: ").concat(i, "}")), i;
        }
        registerMLConstant(t, r, n, o, i, a) {
            if (!a) throw new Error("External mounted files are not available.");
            let d = t;
            t.startsWith("./") && (d = t.substring(2));
            let l = a.get(d);
            if (!l) throw new Error("File with name ".concat(d, " not found in preloaded files."));
            if (r + n > l.byteLength) throw new Error("Out of bounds: data offset and length exceed the external file data size.");
            let p = l.slice(r, r + n).buffer, m;
            switch(i.dataType){
                case "float32":
                    m = new Float32Array(p);
                    break;
                case "float16":
                    m = new Uint16Array(p);
                    break;
                case "int32":
                    m = new Int32Array(p);
                    break;
                case "uint32":
                    m = new Uint32Array(p);
                    break;
                case "int64":
                    m = new BigInt64Array(p);
                    break;
                case "uint64":
                    m = new BigUint64Array(p);
                    break;
                case "int8":
                    m = new Int8Array(p);
                    break;
                case "int4":
                case "uint4":
                case "uint8":
                    m = new Uint8Array(p);
                    break;
                default:
                    throw new Error("Unsupported data type: ".concat(i.dataType, " in creating WebNN Constant from external data."));
            }
            return ue("verbose", ()=>"[WebNN] registerMLConstant {dataType: ".concat(i.dataType, ", shape: ").concat(i.shape, "}}")), o.constant(i, m);
        }
        flush() {}
        constructor(t){
            this.tensorManager = rc(this);
            this.mlContextBySessionId = new Map;
            this.sessionIdsByMLContext = new Map;
            this.mlContextCache = [];
            Rr(t.logLevel, !!t.debug);
        }
    };
});
var ac = {};
Ft(ac, {
    init: ()=>mg
});
var rr, Eo, mg, sc = U(()=>{
    "use strict";
    te();
    Jl();
    et();
    oe();
    ic();
    rr = class e1 {
        getFloat32Array() {
            if (this.dataType !== 1) throw new Error("Invalid data type");
            let t = C.size(this.dims);
            return t === 0 ? new Float32Array : new Float32Array(this.module.HEAP8.buffer, this.data, t);
        }
        getBigInt64Array() {
            if (this.dataType !== 7) throw new Error("Invalid data type");
            let t = C.size(this.dims);
            return t === 0 ? new BigInt64Array : new BigInt64Array(this.module.HEAP8.buffer, this.data, t);
        }
        getInt32Array() {
            if (this.dataType !== 6) throw new Error("Invalid data type");
            let t = C.size(this.dims);
            return t === 0 ? new Int32Array : new Int32Array(this.module.HEAP8.buffer, this.data, t);
        }
        getUint16Array() {
            if (this.dataType !== 10 && this.dataType !== 4) throw new Error("Invalid data type");
            let t = C.size(this.dims);
            return t === 0 ? new Uint16Array : new Uint16Array(this.module.HEAP8.buffer, this.data, t);
        }
        reshape(t) {
            if (C.size(t) !== C.size(this.dims)) throw new Error("Invalid new shape");
            return new e1(this.module, this.dataType, this.data, t);
        }
        constructor(t, r, n, o){
            this.module = t;
            this.dataType = r;
            this.data = n;
            this.dims = o;
        }
    }, Eo = class {
        get kernelCustomData() {
            return this.backend.currentKernelCustomData;
        }
        get customDataBuffer() {
            return this.module.HEAPU8.subarray(this.customDataOffset, this.customDataOffset + this.customDataSize);
        }
        compute(t, r) {
            var _r_inputs;
            var _r_inputs_map, _r_outputs;
            let n = (_r_inputs_map = r === null || r === void 0 ? void 0 : (_r_inputs = r.inputs) === null || _r_inputs === void 0 ? void 0 : _r_inputs.map((d)=>typeof d == "number" ? this.inputs[d] : d)) !== null && _r_inputs_map !== void 0 ? _r_inputs_map : this.inputs, o = (_r_outputs = r === null || r === void 0 ? void 0 : r.outputs) !== null && _r_outputs !== void 0 ? _r_outputs : [], i = (d, l, p)=>new rr(this.module, l, this.output(d, p), p), a = (d, l)=>{
                let p = Ct(d, l);
                if (!p) throw new Error("Unsupported data type: ".concat(d));
                let m = p > 0 ? this.backend.gpuDataManager.create(p).id : 0;
                return new rr(this.module, d, m, l);
            };
            return this.backend.run(t, n, o, i, a, this.outputCount);
        }
        output(t, r) {
            let n = this.module.stackSave();
            try {
                let o = this.module.PTR_SIZE, i = o === 4 ? "i32" : "i64", a = this.module.stackAlloc((1 + r.length) * o);
                this.module.setValue(a, r.length, i);
                for(let d = 0; d < r.length; d++)this.module.setValue(a + o * (d + 1), r[d], i);
                return this.module._JsepOutput(this.opKernelContext, t, a);
            } catch (o) {
                throw new Error("Failed to generate kernel's output[".concat(t, "] with dims [").concat(r, "]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ").concat(o));
            } finally{
                this.module.stackRestore(n);
            }
        }
        constructor(t, r, n){
            this.module = t;
            this.backend = r;
            this.customDataOffset = 0;
            this.customDataSize = 0;
            this.adapterInfo = r.adapterInfo, this.deviceInfo = r.deviceInfo;
            let o = t.PTR_SIZE, i = n / t.PTR_SIZE, a = o === 4 ? "i32" : "i64";
            this.opKernelContext = Number(t.getValue(o * i++, a));
            let d = Number(t.getValue(o * i++, a));
            this.outputCount = Number(t.getValue(o * i++, a)), this.customDataOffset = Number(t.getValue(o * i++, "*")), this.customDataSize = Number(t.getValue(o * i++, a));
            let l = [];
            for(let p = 0; p < d; p++){
                let m = Number(t.getValue(o * i++, a)), u = Number(t.getValue(o * i++, "*")), h = Number(t.getValue(o * i++, a)), _ = [];
                for(let y = 0; y < h; y++)_.push(Number(t.getValue(o * i++, a)));
                l.push(new rr(t, m, u, _));
            }
            this.inputs = l;
        }
    }, mg = async (e1, t, r, n)=>{
        let o = t.jsepInit;
        if (!o) throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");
        if (e1 === "webgpu") {
            let i = new on;
            await i.initialize(r, n), o("webgpu", [
                i,
                (a)=>i.alloc(Number(a)),
                (a)=>i.free(a),
                function(a, d, l) {
                    let p = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
                    if (p) ue("verbose", ()=>"[WebGPU] jsepCopyGpuToGpu: src=".concat(Number(a), ", dst=").concat(Number(d), ", size=").concat(Number(l))), i.memcpy(Number(a), Number(d));
                    else {
                        ue("verbose", ()=>"[WebGPU] jsepCopyCpuToGpu: dataOffset=".concat(Number(a), ", gpuDataId=").concat(Number(d), ", size=").concat(Number(l)));
                        let m = t.HEAPU8.subarray(Number(a >>> 0), Number(a >>> 0) + Number(l));
                        i.upload(Number(d), m);
                    }
                },
                async (a, d, l)=>{
                    ue("verbose", ()=>"[WebGPU] jsepCopyGpuToCpu: gpuDataId=".concat(a, ", dataOffset=").concat(d, ", size=").concat(l)), await i.download(Number(a), ()=>t.HEAPU8.subarray(Number(d) >>> 0, Number(d + l) >>> 0));
                },
                (a, d, l)=>i.createKernel(a, Number(d), l, t.UTF8ToString(t._JsepGetNodeName(Number(d)))),
                (a)=>i.releaseKernel(a),
                (a, d, l, p)=>{
                    ue("verbose", ()=>"[WebGPU] jsepRun: sessionHandle=".concat(l, ", kernel=").concat(a, ", contextDataOffset=").concat(d));
                    let m = new Eo(t, i, Number(d));
                    return i.computeKernel(Number(a), m, p);
                },
                ()=>i.captureBegin(),
                ()=>i.captureEnd(),
                ()=>i.replay()
            ]);
        } else {
            let i = new un(r);
            o("webnn", [
                i,
                ()=>i.reserveTensorId(),
                (a)=>i.releaseTensorId(a),
                async (a, d, l, p)=>i.ensureTensor(a, d, l, p),
                (a, d)=>{
                    i.uploadTensor(a, d);
                },
                async (a, d)=>i.downloadTensor(a, d)
            ]);
        }
    };
});
var fg, Tr, Ir, Pt, hg, Kt, Cr, Ar, uc, kr, Er, Pr, qn = U(()=>{
    "use strict";
    Ha();
    qa();
    te();
    gt();
    Or();
    Xn();
    fg = (e1, t)=>{
        Ie()._OrtInit(e1, t) !== 0 && pe("Can't initialize onnxruntime.");
    }, Tr = async (e1)=>{
        fg(e1.wasm.numThreads, Zt(e1.logLevel));
    }, Ir = async (e1, t)=>{
        {
            let r = (sc(), br(ac)).init;
            if (t === "webgpu") {
                if (typeof navigator > "u" || !navigator.gpu) throw new Error("WebGPU is not supported in current environment");
                let n = e1.webgpu.adapter;
                if (n) {
                    if (typeof n.limits != "object" || typeof n.features != "object" || typeof n.requestDevice != "function") throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.");
                } else {
                    let o = e1.webgpu.powerPreference;
                    if (o !== void 0 && o !== "low-power" && o !== "high-performance") throw new Error('Invalid powerPreference setting: "'.concat(o, '"'));
                    let i = e1.webgpu.forceFallbackAdapter;
                    if (i !== void 0 && typeof i != "boolean") throw new Error('Invalid forceFallbackAdapter setting: "'.concat(i, '"'));
                    if (n = await navigator.gpu.requestAdapter({
                        powerPreference: o,
                        forceFallbackAdapter: i
                    }), !n) throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.');
                }
                await r("webgpu", Ie(), e1, n);
            }
            if (t === "webnn") {
                if (typeof navigator > "u" || !navigator.ml) throw new Error("WebNN is not supported in current environment");
                await r("webnn", Ie(), e1);
            }
        }
    }, Pt = new Map, hg = (e1)=>{
        let t = Ie(), r = t.stackSave();
        try {
            let n = t.PTR_SIZE, o = t.stackAlloc(2 * n);
            t._OrtGetInputOutputCount(e1, o, o + n) !== 0 && pe("Can't get session input/output count.");
            let a = n === 4 ? "i32" : "i64";
            return [
                Number(t.getValue(o, a)),
                Number(t.getValue(o + n, a))
            ];
        } finally{
            t.stackRestore(r);
        }
    }, Kt = (e1)=>{
        let t = Ie(), r = t._malloc(e1.byteLength);
        if (r === 0) throw new Error("Can't create a session. failed to allocate a buffer of size ".concat(e1.byteLength, "."));
        return t.HEAPU8.set(e1, r), [
            r,
            e1.byteLength
        ];
    }, Cr = async (e1, t)=>{
        let r, n, o = Ie();
        Array.isArray(e1) ? [r, n] = e1 : e1.buffer === o.HEAPU8.buffer ? [r, n] = [
            e1.byteOffset,
            e1.byteLength
        ] : [r, n] = Kt(e1);
        let i = 0, a = 0, d = 0, l = [], p = [], m = [];
        try {
            var _o_jsepOnCreateSession;
            if ([a, l] = Fa(t), (t === null || t === void 0 ? void 0 : t.externalData) && o.mountExternalData) {
                let v = [];
                for (let S of t.externalData){
                    let T = typeof S == "string" ? S : S.path;
                    v.push(Qt(typeof S == "string" ? S : S.data).then((A)=>{
                        o.mountExternalData(T, A);
                    }));
                }
                await Promise.all(v);
            }
            var _t_executionProviders;
            for (let v of (_t_executionProviders = t === null || t === void 0 ? void 0 : t.executionProviders) !== null && _t_executionProviders !== void 0 ? _t_executionProviders : [])if ((typeof v == "string" ? v : v.name) === "webnn") {
                if (o.shouldTransferToMLTensor = !1, typeof v != "string") {
                    let T = v, A = T === null || T === void 0 ? void 0 : T.context, k = T === null || T === void 0 ? void 0 : T.gpuDevice, P = T === null || T === void 0 ? void 0 : T.deviceType, D = T === null || T === void 0 ? void 0 : T.powerPreference;
                    A ? o.currentContext = A : k ? o.currentContext = await o.jsepCreateMLContext(k) : o.currentContext = await o.jsepCreateMLContext({
                        deviceType: P,
                        powerPreference: D
                    });
                } else o.currentContext = await o.jsepCreateMLContext();
                break;
            }
            i = await o._OrtCreateSession(r, n, a), i === 0 && pe("Can't create a session."), (_o_jsepOnCreateSession = o.jsepOnCreateSession) === null || _o_jsepOnCreateSession === void 0 ? void 0 : _o_jsepOnCreateSession.call(o), o.currentContext && (o.jsepRegisterMLContext(i, o.currentContext), o.currentContext = void 0, o.shouldTransferToMLTensor = !0);
            let [u, h] = hg(i), _ = !!(t === null || t === void 0 ? void 0 : t.enableGraphCapture), y = [], g = [], x = [];
            for(let v = 0; v < u; v++){
                let S = o._OrtGetInputName(i, v);
                S === 0 && pe("Can't get an input name."), p.push(S), y.push(o.UTF8ToString(S));
            }
            for(let v = 0; v < h; v++){
                let S = o._OrtGetOutputName(i, v);
                S === 0 && pe("Can't get an output name."), m.push(S);
                let T = o.UTF8ToString(S);
                g.push(T);
                {
                    var _t_preferredOutputLocation;
                    if (_ && (t === null || t === void 0 ? void 0 : t.preferredOutputLocation) === void 0) {
                        x.push("gpu-buffer");
                        continue;
                    }
                    var _t_preferredOutputLocation_T;
                    let A = typeof (t === null || t === void 0 ? void 0 : t.preferredOutputLocation) == "string" ? t.preferredOutputLocation : (_t_preferredOutputLocation_T = t === null || t === void 0 ? void 0 : (_t_preferredOutputLocation = t.preferredOutputLocation) === null || _t_preferredOutputLocation === void 0 ? void 0 : _t_preferredOutputLocation[T]) !== null && _t_preferredOutputLocation_T !== void 0 ? _t_preferredOutputLocation_T : "cpu";
                    if (A !== "cpu" && A !== "cpu-pinned" && A !== "gpu-buffer" && A !== "ml-tensor") throw new Error("Not supported preferred output location: ".concat(A, "."));
                    if (_ && A !== "gpu-buffer") throw new Error("Not supported preferred output location: ".concat(A, ". Only 'gpu-buffer' location is supported when enableGraphCapture is true."));
                    x.push(A);
                }
            }
            let $ = null;
            return x.some((v)=>v === "gpu-buffer" || v === "ml-tensor") && (d = o._OrtCreateBinding(i), d === 0 && pe("Can't create IO binding."), $ = {
                handle: d,
                outputPreferredLocations: x,
                outputPreferredLocationsEncoded: x.map((v)=>Qn(v))
            }), Pt.set(i, [
                i,
                p,
                m,
                $,
                _,
                !1
            ]), [
                i,
                y,
                g
            ];
        } catch (u) {
            throw p.forEach((h)=>o._OrtFree(h)), m.forEach((h)=>o._OrtFree(h)), d !== 0 && o._OrtReleaseBinding(d) !== 0 && pe("Can't release IO binding."), i !== 0 && o._OrtReleaseSession(i) !== 0 && pe("Can't release session."), u;
        } finally{
            var _o_unmountExternalData;
            o._free(r), a !== 0 && o._OrtReleaseSessionOptions(a) !== 0 && pe("Can't release session options."), l.forEach((u)=>o._free(u)), (_o_unmountExternalData = o.unmountExternalData) === null || _o_unmountExternalData === void 0 ? void 0 : _o_unmountExternalData.call(o);
        }
    }, Ar = (e1)=>{
        var _t_jsepOnReleaseSession;
        let t = Ie(), r = Pt.get(e1);
        if (!r) throw new Error("cannot release session. invalid session id: ".concat(e1));
        let [n, o, i, a, d] = r;
        a && (d && t._OrtClearBoundOutputs(a.handle) !== 0 && pe("Can't clear bound outputs."), t._OrtReleaseBinding(a.handle) !== 0 && pe("Can't release IO binding.")), (_t_jsepOnReleaseSession = t.jsepOnReleaseSession) === null || _t_jsepOnReleaseSession === void 0 ? void 0 : _t_jsepOnReleaseSession.call(t, e1), o.forEach((l)=>t._OrtFree(l)), i.forEach((l)=>t._OrtFree(l)), t._OrtReleaseSession(n) !== 0 && pe("Can't release session."), Pt.delete(e1);
    }, uc = function(e1, t, r, n, o) {
        let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : !1;
        if (!e1) {
            t.push(0);
            return;
        }
        let a = Ie(), d = a.PTR_SIZE, l = e1[0], p = e1[1], m = e1[3], u, h;
        if (l === "string" && (m === "gpu-buffer" || m === "ml-tensor")) throw new Error("String tensor is not supported on GPU.");
        if (i && m !== "gpu-buffer") throw new Error("External buffer must be provided for input/output index ".concat(o, " when enableGraphCapture is true."));
        if (m === "gpu-buffer") {
            let g = e1[2].gpuBuffer;
            h = Ct(Yt(l), p);
            let x = a.jsepRegisterBuffer;
            if (!x) throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');
            u = x(n, o, g, h);
        } else if (m === "ml-tensor") {
            let g = e1[2].mlTensor;
            h = Ct(Yt(l), p);
            let x = a.jsepRegisterMLTensor;
            if (!x) throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');
            u = x(g, Yt(l), p);
        } else {
            let g = e1[2];
            if (Array.isArray(g)) {
                h = d * g.length, u = a._malloc(h), r.push(u);
                for(let x = 0; x < g.length; x++){
                    if (typeof g[x] != "string") throw new TypeError("tensor data at index ".concat(x, " is not a string"));
                    a.setValue(u + x * d, ke(g[x], r), "*");
                }
            } else h = g.byteLength, u = a._malloc(h), r.push(u), a.HEAPU8.set(new Uint8Array(g.buffer, g.byteOffset, h), u);
        }
        let _ = a.stackSave(), y = a.stackAlloc(4 * p.length);
        try {
            p.forEach((x, $)=>a.setValue(y + $ * d, x, d === 4 ? "i32" : "i64"));
            let g = a._OrtCreateTensor(Yt(l), u, h, y, p.length, Qn(m));
            g === 0 && pe("Can't create tensor for input/output. session=".concat(n, ", index=").concat(o, ".")), t.push(g);
        } finally{
            a.stackRestore(_);
        }
    }, kr = async (e1, t, r, n, o, i)=>{
        let a = Ie(), d = a.PTR_SIZE, l = Pt.get(e1);
        if (!l) throw new Error("cannot run inference. invalid session id: ".concat(e1));
        let p = l[0], m = l[1], u = l[2], h = l[3], _ = l[4], y = l[5], g = t.length, x = n.length, $ = 0, v = [], S = [], T = [], A = [], k = a.stackSave(), P = a.stackAlloc(g * d), D = a.stackAlloc(g * d), R = a.stackAlloc(x * d), G = a.stackAlloc(x * d);
        try {
            var _a_jsepOnRunStart;
            (_a_jsepOnRunStart = a.jsepOnRunStart) === null || _a_jsepOnRunStart === void 0 ? void 0 : _a_jsepOnRunStart.call(a, p), [$, v] = Ga(i);
            for(let V = 0; V < g; V++)uc(r[V], S, A, e1, t[V], _);
            for(let V = 0; V < x; V++)uc(o[V], T, A, e1, g + n[V], _);
            for(let V = 0; V < g; V++)a.setValue(P + V * d, S[V], "*"), a.setValue(D + V * d, m[t[V]], "*");
            for(let V = 0; V < x; V++)a.setValue(R + V * d, T[V], "*"), a.setValue(G + V * d, u[n[V]], "*");
            if (h && !y) {
                let { handle: V, outputPreferredLocations: Q, outputPreferredLocationsEncoded: se } = h;
                if (m.length !== g) throw new Error("input count from feeds (".concat(g, ") is expected to be always equal to model's input count (").concat(m.length, ")."));
                for(let Y = 0; Y < g; Y++){
                    let ee = t[Y];
                    await a._OrtBindInput(V, m[ee], S[Y]) !== 0 && pe("Can't bind input[".concat(Y, "] for session=").concat(e1, "."));
                }
                for(let Y = 0; Y < x; Y++){
                    var _o_Y;
                    let ee = n[Y];
                    ((_o_Y = o[Y]) === null || _o_Y === void 0 ? void 0 : _o_Y[3]) ? a._OrtBindOutput(V, u[ee], T[Y], 0) !== 0 && pe("Can't bind pre-allocated output[".concat(Y, "] for session=").concat(e1, ".")) : a._OrtBindOutput(V, u[ee], 0, se[ee]) !== 0 && pe("Can't bind output[".concat(Y, "] to ").concat(Q[Y], " for session=").concat(e1, "."));
                }
                Pt.set(e1, [
                    p,
                    m,
                    u,
                    h,
                    _,
                    !0
                ]);
            }
            let K;
            h ? K = await a._OrtRunWithBinding(p, h.handle, x, R, $) : K = await a._OrtRun(p, D, P, g, G, x, R, $), K !== 0 && pe("failed to call OrtRun().");
            let j = [];
            for(let V = 0; V < x; V++){
                let Q = Number(a.getValue(R + V * d, "*"));
                if (Q === T[V]) {
                    j.push(o[V]);
                    continue;
                }
                let se = a.stackSave(), Y = a.stackAlloc(4 * d), ee = !1, J, ne = 0;
                try {
                    a._OrtGetTensorData(Q, Y, Y + d, Y + 2 * d, Y + 3 * d) !== 0 && pe("Can't access output tensor data on index ".concat(V, "."));
                    let Oe = d === 4 ? "i32" : "i64", $e = Number(a.getValue(Y, Oe));
                    ne = a.getValue(Y + d, "*");
                    let le = a.getValue(Y + d * 2, "*"), W = Number(a.getValue(Y + d * 3, Oe)), q = [];
                    for(let we = 0; we < W; we++)q.push(Number(a.getValue(le + we * d, Oe)));
                    a._OrtFree(le) !== 0 && pe("Can't free memory for tensor dims.");
                    let he = q.reduce((we, ye)=>we * ye, 1);
                    J = bt($e);
                    let Ge = h === null || h === void 0 ? void 0 : h.outputPreferredLocations[n[V]];
                    if (J === "string") {
                        if (Ge === "gpu-buffer" || Ge === "ml-tensor") throw new Error("String tensor is not supported on GPU.");
                        let we = [];
                        for(let ye = 0; ye < he; ye++){
                            let Ye = a.getValue(ne + ye * d, "*"), Lt = a.getValue(ne + (ye + 1) * d, "*"), fn = ye === he - 1 ? void 0 : Lt - Ye;
                            we.push(a.UTF8ToString(Ye, fn));
                        }
                        j.push([
                            J,
                            q,
                            we,
                            "cpu"
                        ]);
                    } else if (Ge === "gpu-buffer" && he > 0) {
                        let we = a.jsepGetBuffer;
                        if (!we) throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');
                        let ye = we(ne), Ye = Ct($e, he);
                        if (Ye === void 0 || !Br(J)) throw new Error("Unsupported data type: ".concat(J));
                        ee = !0, j.push([
                            J,
                            q,
                            {
                                gpuBuffer: ye,
                                download: a.jsepCreateDownloader(ye, Ye, J),
                                dispose: ()=>{
                                    a._OrtReleaseTensor(Q) !== 0 && pe("Can't release tensor.");
                                }
                            },
                            "gpu-buffer"
                        ]);
                    } else if (Ge === "ml-tensor" && he > 0) {
                        let we = a.jsepEnsureTensor;
                        if (!we) throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');
                        if (Ct($e, he) === void 0 || !Mr(J)) throw new Error("Unsupported data type: ".concat(J));
                        let Ye = await we(ne, $e, q, !1);
                        ee = !0, j.push([
                            J,
                            q,
                            {
                                mlTensor: Ye,
                                download: a.jsepCreateMLTensorDownloader(ne, J),
                                dispose: ()=>{
                                    a.jsepReleaseTensorId(ne), a._OrtReleaseTensor(Q);
                                }
                            },
                            "ml-tensor"
                        ]);
                    } else {
                        let we = Dr(J), ye = new we(he);
                        new Uint8Array(ye.buffer, ye.byteOffset, ye.byteLength).set(a.HEAPU8.subarray(ne, ne + ye.byteLength)), j.push([
                            J,
                            q,
                            ye,
                            "cpu"
                        ]);
                    }
                } finally{
                    a.stackRestore(se), J === "string" && ne && a._free(ne), ee || a._OrtReleaseTensor(Q);
                }
            }
            return h && !_ && (a._OrtClearBoundOutputs(h.handle) !== 0 && pe("Can't clear bound outputs."), Pt.set(e1, [
                p,
                m,
                u,
                h,
                _,
                !1
            ])), j;
        } finally{
            a.stackRestore(k), S.forEach((K)=>a._OrtReleaseTensor(K)), T.forEach((K)=>a._OrtReleaseTensor(K)), A.forEach((K)=>a._free(K)), $ !== 0 && a._OrtReleaseRunOptions($), v.forEach((K)=>a._free(K));
        }
    }, Er = (e1)=>{
        let t = Ie(), r = Pt.get(e1);
        if (!r) throw new Error("invalid session id");
        let n = r[0], o = t._OrtEndProfiling(n);
        o === 0 && pe("Can't get an profile file name."), t._OrtFree(o);
    }, Pr = (e1)=>{
        let t = [];
        for (let r of e1){
            let n = r[2];
            !Array.isArray(n) && "buffer" in n && t.push(n.buffer);
        }
        return t;
    };
});
var zt, Le, nr, ln, cn, dn, Po, zo, Vt, Wt, bg, dc, lc, cc, pc, mc, fc, hc, Oo = U(()=>{
    "use strict";
    We();
    qn();
    gt();
    xr();
    zt = ()=>!!ve.wasm.proxy && typeof document < "u", nr = !1, ln = !1, cn = !1, zo = new Map, Vt = (e1, t)=>{
        let r = zo.get(e1);
        r ? r.push(t) : zo.set(e1, [
            t
        ]);
    }, Wt = ()=>{
        if (nr || !ln || cn || !Le) throw new Error("worker not ready");
    }, bg = (e1)=>{
        switch(e1.data.type){
            case "init-wasm":
                nr = !1, e1.data.err ? (cn = !0, Po[1](e1.data.err)) : (ln = !0, Po[0]()), dn && (URL.revokeObjectURL(dn), dn = void 0);
                break;
            case "init-ep":
            case "copy-from":
            case "create":
            case "release":
            case "run":
            case "end-profiling":
                {
                    let t = zo.get(e1.data.type);
                    e1.data.err ? t.shift()[1](e1.data.err) : t.shift()[0](e1.data.out);
                    break;
                }
            default:
        }
    }, dc = async ()=>{
        if (!ln) {
            if (nr) throw new Error("multiple calls to 'initWasm()' detected.");
            if (cn) throw new Error("previous call to 'initWasm()' failed.");
            if (nr = !0, zt()) return new Promise((e1, t)=>{
                Le === null || Le === void 0 ? void 0 : Le.terminate(), Va().then((param)=>{
                    let [r, n] = param;
                    try {
                        var _url;
                        Le = n, Le.onerror = (i)=>t(i), Le.onmessage = bg, Po = [
                            e1,
                            t
                        ];
                        let o = {
                            type: "init-wasm",
                            in: ve
                        };
                        !o.in.wasm.wasmPaths && (r || ((_url = import.meta.url) === null || _url === void 0 ? void 0 : _url.startsWith("file:"))) && (o.in.wasm.wasmPaths = {
                            wasm: new URL("ort-wasm-simd-threaded.jsep.wasm", import.meta.url).href
                        }), Le.postMessage(o), dn = r;
                    } catch (o) {
                        t(o);
                    }
                }, t);
            });
            try {
                await Sr(ve.wasm), await Tr(ve), ln = !0;
            } catch (e1) {
                throw cn = !0, e1;
            } finally{
                nr = !1;
            }
        }
    }, lc = async (e1)=>{
        if (zt()) return Wt(), new Promise((t, r)=>{
            Vt("init-ep", [
                t,
                r
            ]);
            let n = {
                type: "init-ep",
                in: {
                    epName: e1,
                    env: ve
                }
            };
            Le.postMessage(n);
        });
        await Ir(ve, e1);
    }, cc = async (e1)=>zt() ? (Wt(), new Promise((t, r)=>{
            Vt("copy-from", [
                t,
                r
            ]);
            let n = {
                type: "copy-from",
                in: {
                    buffer: e1
                }
            };
            Le.postMessage(n, [
                e1.buffer
            ]);
        })) : Kt(e1), pc = async (e1, t)=>{
        if (zt()) {
            if (t === null || t === void 0 ? void 0 : t.preferredOutputLocation) throw new Error('session option "preferredOutputLocation" is not supported for proxy.');
            return Wt(), new Promise((r, n)=>{
                Vt("create", [
                    r,
                    n
                ]);
                let o = {
                    type: "create",
                    in: {
                        model: e1,
                        options: {
                            ...t
                        }
                    }
                }, i = [];
                e1 instanceof Uint8Array && i.push(e1.buffer), Le.postMessage(o, i);
            });
        } else return Cr(e1, t);
    }, mc = async (e1)=>{
        if (zt()) return Wt(), new Promise((t, r)=>{
            Vt("release", [
                t,
                r
            ]);
            let n = {
                type: "release",
                in: e1
            };
            Le.postMessage(n);
        });
        Ar(e1);
    }, fc = async (e1, t, r, n, o, i)=>{
        if (zt()) {
            if (r.some((a)=>a[3] !== "cpu")) throw new Error("input tensor on GPU is not supported for proxy.");
            if (o.some((a)=>a)) throw new Error("pre-allocated output tensor is not supported for proxy.");
            return Wt(), new Promise((a, d)=>{
                Vt("run", [
                    a,
                    d
                ]);
                let l = r, p = {
                    type: "run",
                    in: {
                        sessionId: e1,
                        inputIndices: t,
                        inputs: l,
                        outputIndices: n,
                        options: i
                    }
                };
                Le.postMessage(p, Pr(l));
            });
        } else return kr(e1, t, r, n, o, i);
    }, hc = async (e1)=>{
        if (zt()) return Wt(), new Promise((t, r)=>{
            Vt("end-profiling", [
                t,
                r
            ]);
            let n = {
                type: "end-profiling",
                in: e1
            };
            Le.postMessage(n);
        });
        Er(e1);
    };
});
var gc, yg, pn, bc = U(()=>{
    "use strict";
    We();
    Oo();
    te();
    $r();
    Xn();
    gc = (e1, t)=>{
        switch(e1.location){
            case "cpu":
                return [
                    e1.type,
                    e1.dims,
                    e1.data,
                    "cpu"
                ];
            case "gpu-buffer":
                return [
                    e1.type,
                    e1.dims,
                    {
                        gpuBuffer: e1.gpuBuffer
                    },
                    "gpu-buffer"
                ];
            case "ml-tensor":
                return [
                    e1.type,
                    e1.dims,
                    {
                        mlTensor: e1.mlTensor
                    },
                    "ml-tensor"
                ];
            default:
                throw new Error("invalid data location: ".concat(e1.location, " for ").concat(t()));
        }
    }, yg = (e1)=>{
        switch(e1[3]){
            case "cpu":
                return new He(e1[0], e1[2], e1[1]);
            case "gpu-buffer":
                {
                    let t = e1[0];
                    if (!Br(t)) throw new Error("not supported data type: ".concat(t, " for deserializing GPU tensor"));
                    let { gpuBuffer: r, download: n, dispose: o } = e1[2];
                    return He.fromGpuBuffer(r, {
                        dataType: t,
                        dims: e1[1],
                        download: n,
                        dispose: o
                    });
                }
            case "ml-tensor":
                {
                    let t = e1[0];
                    if (!Mr(t)) throw new Error("not supported data type: ".concat(t, " for deserializing MLTensor tensor"));
                    let { mlTensor: r, download: n, dispose: o } = e1[2];
                    return He.fromMLTensor(r, {
                        dataType: t,
                        dims: e1[1],
                        download: n,
                        dispose: o
                    });
                }
            default:
                throw new Error("invalid data location: ".concat(e1[3]));
        }
    }, pn = class {
        async fetchModelAndCopyToWasmMemory(t) {
            return cc(await Qt(t));
        }
        async loadModel(t, r) {
            Ue();
            let n;
            typeof t == "string" ? !1 ? n = await Qt(t) : n = await this.fetchModelAndCopyToWasmMemory(t) : n = t, [this.sessionId, this.inputNames, this.outputNames] = await pc(n, r), De();
        }
        async dispose() {
            return mc(this.sessionId);
        }
        async run(t, r, n) {
            Ue();
            let o = [], i = [];
            Object.entries(t).forEach((h)=>{
                let _ = h[0], y = h[1], g = this.inputNames.indexOf(_);
                if (g === -1) throw new Error("invalid input '".concat(_, "'"));
                o.push(y), i.push(g);
            });
            let a = [], d = [];
            Object.entries(r).forEach((h)=>{
                let _ = h[0], y = h[1], g = this.outputNames.indexOf(_);
                if (g === -1) throw new Error("invalid output '".concat(_, "'"));
                a.push(y), d.push(g);
            });
            let l = o.map((h, _)=>gc(h, ()=>'input "'.concat(this.inputNames[i[_]], '"'))), p = a.map((h, _)=>h ? gc(h, ()=>'output "'.concat(this.outputNames[d[_]], '"')) : null), m = await fc(this.sessionId, i, l, d, p, n), u = {};
            var _a_h;
            for(let h = 0; h < m.length; h++)u[this.outputNames[d[h]]] = (_a_h = a[h]) !== null && _a_h !== void 0 ? _a_h : yg(m[h]);
            return De(), u;
        }
        startProfiling() {}
        endProfiling() {
            hc(this.sessionId);
        }
    };
});
var _c = {};
Ft(_c, {
    OnnxruntimeWebAssemblyBackend: ()=>mn,
    initializeFlags: ()=>yc,
    wasmBackend: ()=>_g
});
var yc, mn, _g, wc = U(()=>{
    "use strict";
    We();
    Oo();
    bc();
    yc = ()=>{
        if ((typeof ve.wasm.initTimeout != "number" || ve.wasm.initTimeout < 0) && (ve.wasm.initTimeout = 0), ve.wasm.simd === !1 && console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'), typeof ve.wasm.proxy != "boolean" && (ve.wasm.proxy = !1), typeof ve.wasm.trace != "boolean" && (ve.wasm.trace = !1), typeof ve.wasm.numThreads != "number" || !Number.isInteger(ve.wasm.numThreads) || ve.wasm.numThreads <= 0) if (typeof self < "u" && !self.crossOriginIsolated) ve.wasm.numThreads = 1;
        else {
            let e1 = typeof navigator > "u" ? Nn("node:os").cpus().length : navigator.hardwareConcurrency;
            ve.wasm.numThreads = Math.min(4, Math.ceil((e1 || 1) / 2));
        }
    }, mn = class {
        async init(t) {
            yc(), await dc(), await lc(t);
        }
        async createInferenceSessionHandler(t, r) {
            let n = new pn;
            return await n.loadModel(t, r), Promise.resolve(n);
        }
    }, _g = new mn;
});
We();
We();
We();
var Ca = "1.21.0-dev.20250114-228dd16893";
var $1 = Fn;
{
    let e1 = (wc(), br(_c)).wasmBackend;
    St("webgpu", e1, 5), St("webnn", e1, 5), St("cpu", e1, 10), St("wasm", e1, 10);
}Object.defineProperty(ve.versions, "web", {
    value: Ca,
    enumerable: !0
});
export { Fp as InferenceSession, wr as TRACE, Ue as TRACE_FUNC_BEGIN, De as TRACE_FUNC_END, He as Tensor, $1 as default, ve as env, St as registerBackend }; /**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */  /**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */  /**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */  //# sourceMappingURL=ort.webgpu.bundle.min.mjs.map
var _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
$RefreshReg$(_c1, "Sa$U");
$RefreshReg$(_c2, "Sa");
$RefreshReg$(_c3, "Ta$U");
$RefreshReg$(_c4, "Ta");
$RefreshReg$(_c5, "Ia$U");
$RefreshReg$(_c6, "Ia");
$RefreshReg$(_c7, "We$U");
$RefreshReg$(_c8, "We");
$RefreshReg$(_c9, "Nr$U");
$RefreshReg$(_c10, "Nr");

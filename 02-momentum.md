---
title: "Chapter 2: The momentum of a quantum particle" 
short_title: "Ch. 2: momentum"
numbering:
  enumerator: 2.%s
---

In the previous chapter we begin our investigation of the quantum mechanics of a particle moving in one dimension, focusing on the **position** of the particle. Here we will continue our development, by now considering how **momentum** is described quantum mechanically. We will see in this chapter that momentum is related to **wave-like** properties of a particle. 

We will introduce the **momentum wavefunction** $\tilde{\psi}(p)$, (in analogy to the spatial wavefunction $\psi(x)$), and give the relationship to the latter, and also introduce the **momentum operator** $\hat{P}$ and its associated operator $\op{P}$ (that acts upon wavefunctions $\psi(x)$). 

## The De Broglie relation and states of definite momentum

Our starting point for understanding the momentum of a quantum particle will in fact be the famous **de Broglie** relationship, which stated that if a particle had a momentum $p$, then it had a wavelength of $\lambda$ equal to
```{math}
:label: e-de-Broglie
\lambda = \frac{h}{p},
```
where $h$ is **Planck's constant**. While this formula is part of '*old quantum theory*' it turns out that the basic insight is ultimately correct. More concretely, what is correct in quantum mechanics is 
>  A quantum particle with definite momentum $p$ has a wavefunction with a definite wavelength $\lambda = h/p$. 

What is a wavefunction with a definite wavelength $\lambda$? This could potentially mean a couple of things, for example $\cos(2\pi x/\lambda)$ or $\sin(2\pi x/\lambda)$? These are both examples of plane waves of wavelength $\lambda$. Neither of these happen to be the correct answer. What we actually mean is a **complex plane wave** 
```{math}
:label: e-complex-plane-wave
Ae^{2\pi i x / \lambda}
``` 
where $A$ is the amplitude (which we take to be real out of convenience for the moment, and will come back to shortly). This is depicted in the following:
```{figure} ./Pictures/complex-circ.svg
:name: discrete-poisitions
:alt: Picture of a quantum particle now in one of eight possible locations
:width: 500px
:align: center
**Complex plane waves** 3 different ways of representing a visually representing a complex plane wave. (a) A plot of the real and imaginary parts of the function. We have $\mathrm{Re}(Ae^{2\pi i x/\lambda}) = A\cos (2\pi x/\lambda)$ and $\mathrm{Im}(Ae^{2\pi i x/\lambda}) = A\sin (2\pi x/\lambda)$. (b) A 3-D plot of this function, with the real and imaginary parts plotted along two orthgonal directions. In this representation, we see that a complex plane wave corresponds to a helix. (c) Polar representation of the function, where the phase is represented by colour. In this representation we have a stripy constant line. 
```

If we substitute the de Broglie relation [](#e-de-Broglie) into [](#e-complex-plane-wave), then we see that
```{math}
Ae^{2\pi i x/\lambda} = Ae^{2\pi i p x/h} = A e^{ipx/\hbar},
```
where
````{card}
```{math}
\hbar = \frac{h}{2\pi},
```
````
is the so-called **reduced Planck constant** or simply '**h-bar**' for short. 

Putting everything together, in quantum mechanics, **particles that have a definite momentum $p$ have wavefunctions $v_p(x)$ given by
````{card}
```{math}
v_p(x) = A e^{ipx/\hbar},
```
````
corresponding to **complex plane waves** of wavelength $\lambda = h/p$. We will take this essentially as a **postulate**, and not attempt to derive this. 

Using [](#e-general-quantum-state), i.e. the general relationship between a quantum state and a wavefunction, this means we can **directly write down** quantum states of definite momentum, which we will denote by $\ket{p}$ and refer to as `momentum states' (in analogy to our notation $\ket{x}$ for position states). These are
```{math}
\ket{p} = \infint v_p(x) \ket{x} dx = A\infint e^{ipx/\hbar} \ket{x} dx.
```
We still have some ambiguity here: we haven't specified what the `amplitude' $A$ should be. We can fix this by analogy to position states. Recall that in [](#e-position-norm) we normalised position states using the Dirac delta function. Here, we will demand that momentum states satisfy the same normalisation condition:
````{card}
```{math}
:label: e-momentum-norm
\langle p' | p \rangle = \delta(p-p').
```
````
As an exercise, you will show that this fixes $A = \frac{1}{\sqrt{2\pi \hbar}}$. We thus have
````{card}
```{math}
:label: e-momentum-eigenstate
\ket{p} = \frac{1}{\sqrt{2\pi \hbar}}\infint e^{ipx/\hbar} \ket{x} dx
```
````
are **quantum states of definite momentum**. 

Note that due to [](#e-momentum-norm), states of definite momentum have **infinite normalisation** (just like states of definite position). What this means is that they are, once again, **unphysical states**! We thus have another profound conclusion:
> It is physically impossible in quantum mechanics for a particle to have a definite momentum.

We can understand this from a second perspective. Our requirement to have a definite wavelength means that a particle has to be spread out **everywhere**. If this were possible, then what would be probability density $p(x)$ to find the particle at some location $x$? This would be
```{math}
\vph p(x) = |v_p(x)|^2 &= \left| \frac{1}{\sqrt{2\pi \hbar}}e^{ipx/\hbar}\right|^2, \\
&= \frac{1}{\sqrt{2\pi \hbar}}e^{-ipx/\hbar}\frac{1}{\sqrt{2\pi \hbar}}e^{ipx/\hbar}, \\
&= \frac{1}{2\pi \hbar}.
```
This is a **uniform** probability density — we are equally likely to find the particle anywhere. If we then ask what is the **total** probability to find the particle anywhere, we see that
```{math}
\infint p(x) dx = \infint \frac{1}{2\pi \hbar} dx = \infty. 
```
This is an unphysical result. Furthermore, we can't even 'fix' it, by changing our normalisation, since **any** non-zero choice of normalisation will lead to the same conclusion. We therefore see that it must be physically impossible to have a particle whose wavefunction is a (complex) plane wave, and therefore it is physically impossible to have a definite momentum. 

Nevertheless, just as it is extremely **useful** to use position states $\ket{x}$, it is similarly useful to use the momentum states $\ket{p}$, even though they aren't valid quantum states. 

## The momentum operator


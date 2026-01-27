---
title: "Chapter 4: Energy and the Hamiltonian" 
short_title: "Ch. 4: Energy"
numbering:
  enumerator: 4.%s
---

`````{important} Video: Energy & the Hamiltonian
:class: dropdown
```{iframe} https://mediasite.bris.ac.uk/Mediasite/Play/8865f29e8f794c908f46b422354613a01d
:width: 100%
```
````{tip} Slides
:class: dropdown
```{iframe} https://www.ole.bris.ac.uk/bbcswebdav/users/phyps/Quantum%20Mechanics/2024-5/Lecture%20Slides/QM-4.pdf
:width: 100%
```
````
`````

In this Chapter we will consider now the final important physical property of a particle we will study in this unit — the energy. Not only is this one of the most important physical properties in nature, due to its **conservation law**, it is central to the **time evolution** in quantum mechanics, as we will begin investigating in the next [Chapter](05-time-evolution). 

We will reintroduce the **Hamiltonian operator** (the total-energy operator), in the context of mechanics, its associated **eigenvalue equation**, and discuss the important notion of **bound** and **non-bound** states, and their distinct description within quantum mechanics. 

## The Hamiltonian

What different types of energy can a particle have? In the context of the mechanics of a single particle, there are two primary contributions to the energy: the **kinetic energy** and the **potential energy**. The total energy of a particle is just the sum of these two. We call the total energy the **Hamiltonian** (after Hamilton), which will be
```{math}
H = K + V,
```
where $K$ is the kinetic energy, and $V$ is the potential energy. 
```{aside} *Other contributions to energy*
*There are, of course, other contributions to the energy in general. For instance, thermal energy, rotational kinetic energy, etc. Here, as in classical mechanics, we focus on very simple situations, where we can safely **neglect** all of these other contributions, and focus exclusively on the kinetic and potential energies.*
```
While up until now you may have found it more customary to write the kinetic energy as $K = \frac{1}{2}Mv^2$, where $M$ is the mass of the particle and $v$ is the velocity, since $p = Mv$, we can alternatively write the kinetic energy as
```{math}
K = \frac{p^2}{2M},
```
which turns out to be the 'correct' way to express the kinetic energy in QM. 

The potential energy is associated to the **forces** acting on the particle, through $F = -\frac{\partial V}{\partial x}$. This highlights that the potential energy of a particle is usually a **function of its position** $V(x)$. For example, this might be the gravitational potential energy of a particle (associated to the force of gravity), or the energy stored in a spring for a particle undergoing harmonic motion (associated to the restorative force $F(x) = - kx$, with $k$ the spring constant). 

In quantum mechanics, we associate an **operator** with the total energy, the **Hamiltonian operator** which is given by
````{card}
```{math}
\hat{H} &= \hat{K} + \hat{V},\\
&= \frac{\hat{P}^2}{2M} + \hat{V}.
```
````
As previously, it will be very useful to introduce the associated operator $\op{H}$ that **acts on wavefunctions** $\psi(x)$. It is given by
````{card}
```{math}
\op{H} = \frac{\op{P}^2}{2M} + \op{V}.
```
````
To understand the kinetic energy operator, we see can see that
```{math}
\frac{\op{P}^2}{2M}\psi(x) &= \frac{1}{2M}\op{P}\left(\op{P}\psi(x)\right),\\
&= \frac{1}{2M}\left(-i\hbar \frac{\partial}{\partial x}\right)\left(-i\hbar \frac{\partial}{\partial x}\psi(x)\right),\\
&= -\frac{\hbar^2}{2M}\frac{\partial^2}{\partial x^2}\psi(x),
```
where in the second line we used the explicit form of the momentum operator $\op{P}$ from [](#e-op-P). This shows that
````{card}
```{math}
\op{K} = \frac{\op{P}^2}{2M} = -\frac{\hbar^2}{2M}\frac{\partial^2}{\partial x^2},
```
````
is the kinetic energy operator (acting on wavefunctions). For the potential energy, the situation is simpler. We have
```{math}
\op{V}\psi(x) = V(x)\psi(x),
```
that is, the potential energy operator multiplies the wavefunction at each position $x$ by the value of the potential energy at that position, namely $V(x)$, just as we saw in [](#e-op-X) that the position operator multiplies the wavefunction by the position everywhere. Thus, we can write 
````{card}
```{math}
\op{V} = V(x).
```
````

Putting everything together, we can now write down the Hamiltonian operator acting on wavefunctions:
````{card}
```{math}
\vph\op{H} = -\frac{\hbar^2}{2M}\frac{\partial^2}{\partial x^2} + V(x).
```
````
As you will show in an [exercise](#ex-comm-K-V), the kinetic energy and potential energy **do not commute**, $[\hat{K},\hat{V}] \neq 0$ in general. This leads to a profound aspect of quantum mechanics:

> The kinetic energy and potential energy of a quantum particle are incompatible properties.

That is, a particle cannot have both a well defined kinetic energy and a well defined potential energy at the same time! One intuitive way to see why this **had** to be the case is because the kinetic energy depends only upon the **momentum** of the particle, while the potential energy depends only upon the **position**, and we already know that these two properties are incompatible. Much of the intricacies of how quantum particles behave derives, ultimately, from the fact that these two contributions to energy are incompatible with each other.

## Energy eigenstates

A quantum state where the particle has definite energy corresponds to an **eigenstate of the Hamiltonian** $\hat{H}$. That is, a state $\ket{E}$ of energy $E$ that satisfies the eigenvalue equation
````{card}
```{math}
:label: e-E-eigenvalue-eq
\hat{H}\ket{E} = E\ket{E}.
```
````
As with momentum eigenstates, we can write these eigenstates in terms of their associated wavefunctions,
```{math}
:label: e-eigenstate-wf
\vph \ket{E} = \infint u_E(x) \ket{x} dx,
```
where $u_E(x)$ are wavefunctions of the particle corresponding to states of definite energy. We call these the **energy eigenfunctions**. These wavefunctions will satisfy the associated eigenvalue equation
````{card}
```{math}
:label: e-TISE
\op{H}u_E(x) = E u_E(x).
```
````
For reasons that will become clear in the following chapter, this equation is often referred to as the **Time-independent Schrödinger Equation** or TISE for short. This will in fact be our **central** equation for studying the energy of a particle in quantum mechanics, essentially because of the fact that the potential energy is a function of position. 

## Bound and non-bound states

We end this chapter with an important discussion about **qualitatively distinct** situations that can arise, and how this affects the allowed energies a particle can have, and the properties of their eigenstates. 

(s-bound-states)=
### Bound states

In situations where a particle does not have enough energy to leave a finite region of space we say that it is in a **bound state**. This is a very generic situation, which occurs across all of physics, ranging from planets in bounded orbits around stars, all the way down to electrons bound to a nucleus. What unites all such situations is that the object will be **stuck in the corresponding potential well** (whether that be the gravitational potential well of the star, or the electrostatic potential well of the nucleus). This is most readily depicted graphically:

```{figure}  ./Pictures/potentials
:label: f-potentials-1
:alt: Picture of a two potential wells
:width: 400px
:align: center
Two examples of potential wells. On the left, the well is symmetric. On the right, the well is assymetric. If the energy of the particle is $E<E_B$, then the particle will be 'trapped' inside the well, which we call a bound state. In this case, in QM the particle will have discrete energy levels. If $E > E_B$ the particle is not bound to the well, but will escape to infinity (on the left in either direction; on the right, only towards the right). In QM, in this regime there is no discretisation of energies; energy is continuous but eigenstates becomes unphysical. 
```


For any potential well $V(x)$ there will be a value $E_B$, such that if the energy of the particle is $E < E_B$, then it will not be able to escape from the well, and is hence trapped inside it / bound to it.
```{aside}
*It could be that $E_B = \infty$, i.e. that the particle is **definitely** trapped in the well. We will encounter such situations in this unit, for example a harmonic oscillator, where the particle cannot escape the spring (assuming it doesn't snap!). In general, we expect that $E_B$ is finite, and we should always ask ourselves as a first question, whether particles are always bound, given a specific potential $V(x)$.* 
```

In QM, when a particle is in a bound state, we find that **it can only have certain special and discrete energies** $E_k$. These are the famous **energy levels** (e.g. of atoms). More specifically and mathematically,  we will see that in this case there are **only** physical solutions to the TISE [](#e-TISE) for specific values $E_k$. The corresponding eigenstates $\ket{E_k}$ are **normalised** and **orthogonal** to each other, 
````{card}
```{math}
:label: e-energy-levels-orthonormal
\inner{E_k}{E_\ell} = \begin{cases} 1 &\text{ if } k = \ell \\ 0 &\text{ if } k \neq \ell \end{cases} = \delta_{k,\ell}.
```
````
(s-Non-bound-states)=
### Non-bound states

The alernative situation is where a particle is **not confined** to one region of space, either because **it has too much energy to be bound in the well** ($E > E_B$), or because **there are no forces**, i.e. $V(x) = 0$ and there is no well to be trapped in. Classically, this corresponds to **non-closed orbits**, such as asteroids passing a star, or an electron that isn't bound to a nucleus. In these cases, in principle, the object will eventually **escape to infinity** (travel as far as possible in some direction). 

In QM in this case we find that there is **no discretisation** (no energy levels), but rather the particle can have **any energy** $E > E_B$ (just like it can have any momentum or position in general), and energy remains **continuous** as it is classically. 

However, in this case, just like for position and momentum states, the energy eigenstates are **unnormalisable** and therefore **unphysical**. We take them to satisfy the analogous orthonormality condition as for [position](#e-position-norm) and [momentum](#e-momentum-norm), namely
````{card}
```{math}
:label: e-norm-non-bound-E
\inner{E'}{E} = \delta(E-E'),
```
````
where $\delta(E-E')$ is the [Dirac delta function](#dirac-delta-function). Just as in those cases, even though the states $\ket{E}$ themselves are unphysical, they are a very useful **basis** of states, since **superpositions** can be normalised states. 

We end by noting that in general, a quantum particle could be in a superposition of being **bound** and being **non-bound**. That is, it could have a superposition of energies, including energy levels below $E_B$ and energies above $E_B$. This causes no problem. It will nevertheless be **easier** to study the two regimes **separately** at first, before combining them after, if required by the physical situation under consideration. 
```{aside}
*For example, it is possible, by carefully tuning a laser pulse, to create a superposition of having an atom ionised (exciting an electron, so that it has enough energy to escape the nucleus) and not (the electron still in a bound state).*
```

## Exercises

````{exercise}
:label: ex-comm-K-V
In this exercise we will show that in quantum mechanics, the kinetic energy and the potential energy are **incompatible** observables. In this question, we will consider an arbitrary wavefunction $\psi(x)$. 
1. Calculate $\op{V}\op{K}\psi(x). $
1. Calculate $\op{K}\op{V}\psi(x). $
1. Using parts 1. and 2. show that 
```{math}
\vph[\op{K},\op{V}]\psi = -\frac{\hbar^2}{2M}\left(\frac{\partial^2 V}{\partial x^2}\psi(x) + 2 \frac{\partial V}{\partial x} \frac{\partial}{\partial x}\psi(x) \right)
```
We will denote by $\hat{V}'$ and $\hat{V}''$ the operators satisfying
```{math}
\hat{V}'\ket{\psi} &= \infint \frac{\partial V}{\partial X} \psi(x) \ket{x} dx,\\
\hat{V}''\ket{\psi} &= \infint \frac{\partial^2 V}{\partial X^2} \psi(x) \ket{x} dx.
```
4. Hence, show that
```{math}
\vph[\hat{K},\hat{V}] = -\frac{\hbar^2}{2M}\hat{V}'' - \frac{i\hbar}{M}\hat{V}'\hat{P}.
```
5. The operators $\hat{V}'$ and $\hat{V''}$ can vanish (can satisfy $\hat{V}'\ket{\psi} = 0$). When does this happen? This is the only case in which $[\hat{K},\hat{V}] = 0$. Does this make sense physically?
```{dropdown} Answers
1. $-\frac{\hbar^2}{2M}V(x)\frac{\partial^2 \psi}{\partial x^2}$
2. $-\frac{\hbar^2}{2M}\left(\frac{\partial^2 V}{\partial x^2}\psi(x) + 2 \frac{\partial V}{\partial x}\frac{\partial \psi}{\partial x} + V(x)\frac{\partial^2 \psi}{\partial x^2}\right)$
3. n/a (show that)
4. n/a (show that)
5. $\hat{V}' = 0$ if $V(x) =$ constant (in which case $\hat{V}'' = 0$ also). This does make sense, as if the potential is constant, the force vanishes, so the particle is free.
   ```

````
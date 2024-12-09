---
title: "Chapter 4: Energy and the Hamiltonian" 
short_title: "Ch. 4: Energy"
numbering:
  enumerator: 4.%s
---

In this Chapter we will consider now the final important physical property of a particle we will study in this unit — the energy. Not only is this one of the most important physical properties in nature, due to its **conservation law**, it is central to the **time evolution** in quantum mechanics, as we will begin investigating in the next chapter. 

We will reintroduce the **Hamiltonian operator** (the total-energy operator), in the context of mechanics, its associated **eigenvalue equation** and discuss the important notion of **bound** and **non-bound** states, and their distinct description within quantum mechanics. 

## The Hamiltonian

What different types of energy can a particle have? In the context of the mechanics of a single particle, there are two primary contributions to the energy: the **kinetic energy** and the **potential energy**. The total energy of a particle is just the sum of these two. We call the total energy the **Hamiltonian** (after Hamilton), which will be
```{math}
H = K + V,
```
where $T$ is the kinetic energy, and $V$ is the potential energy. 
```{aside} *Other contributions to energy*
*There are, of course, other contributions to the energy in general. For instance, thermal energy, rotational kinetic energy, etc. Here, as in classical mechanics, we focus on very simple situations, where we can safely **neglect** all of these other contributions, and focus exclusively on the kinetic and potential energies.*
```
While it is more customary to write the kinetic energy as $K = \frac{1}{2}Mv^2$, where $M$ is the mass of the particle, and $v$ is the velocity, since $p = Mv$, we can alternatively write the kinetic energy as
```{math}
K = \frac{p^2}{2M},
```
which turns out to be the 'correct' way to express the kinetic energy in QM. 

The potential energy is associated to the **forces** acting on the particle, through $F = -\frac{\partial V}{\partial x}$. This highlights that the potential energy of a particle is usually a **function of its position** $V(x)$. For example, this might be the gravitational potential energy of a particle (associated to the force of gravity), or the energy stored in a spring for a particle undergoing harmonic motion (associated to the restorative force $F(x) = - kx$ (with $k$ the spring constant). 

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
\op{H} = -\frac{\hbar^2}{2M}\frac{\partial^2}{\partial x^2} + V(x).
```
````
As you will show in an exercise, the kinetic energy and potential energy **do not commute**, $[\hat{K},\hat{V}] \neq 0$ in general. This leads to a profound aspect of quantum mechanics:

> The kinetic energy and potential energy of a quantum particle are incompatible properties.

That is, a particle cannot have both a well defined kinetic energy and a well defined potential energy at the same time! One intuitive way to see why this **had** to be the case is because the kinetic energy depends only upon the **momentum** of the particle, while the potential energy depends only upon the **position**, and we already know that these two properties are incompatible. Much of the intricacies of how quantum particles behave derives, ultimately, from the fact that these two contributions to energy are incompatible with each other.

## Energy eigenstates

A quantum state where the particle has definite energy corresponds to an **eigenstate of the Hamiltonian** $\hat{H}$. That is, a state $\ket{E}$ of energy $E$ that satisfies the eigenvalue equation
````{card}
```{math}
\hat{H}\ket{E} = E\ket{E}.
```
````
As with momentum eigenstates, we can write these eigenstates in terms of their associated wavefunctions,
```{math}
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

In QM, when a particle is in a bound state, we find that **it can only have certain special and discrete energies** $E_k$. These are the famous **energy levels** (e.g. of atoms). More specifically and mathematically, what we will see is that in this case there are **only** physical solutions to the TISE [](#e-TISE) for specific values $E_k$. The corresponding eigenstates $\ket{E_k}$ are **normalised** and **orthogonal** to each other, 
````{card}
```{math}
\inner{E_k}{E_\ell} = \begin{cases} 1 &\text{ if } k = \ell \\ 0 &\text{ if } k \neq \ell \end{cases} = \delta_{k,\ell}.
```
````

### Non-bound states

The alernative situation is where a particle is **not confined** to one region of space, either because **it too much energy to be bound in the well** ($E > E_B$), or because **there are no forces**, i.e. $V(x) = 0$ and there is no well to be trapped in. Classically, this would correspond to non-closed orbits, such as asteroids passing a star, or an electron that isn't bound to a nucleus. In these cases, in principle, the object will eventually **escape to infinity** (travel as far as possible in some direction). 

In QM in this case we find that there is **no discretisation** (no energy levels), but rather the particle can have **any energy** $E > E_B$ (just like it can have any momentum or position in general), and energy remains **continuous** as it is classically. 

However, in this case, just like for position and momentum states, the energy eigenstates are **unnormalisable** and therefore **unphysical**. We take them to satisfy the analogous condition as for position and momentum, namely
````{card}
```{math}
\inner{E'}{E} = \delta(E-E'),
```
````
where $\delta(E-E')$ is the [Dirac delta function](#dirac-delta-function). Just as in those cases, even though the states $\ket{E}$ themselves are unphysical, they are a very useful **basis** of states, since **superpositions** can be normalised states. 

We end by noting that in general, a quantum particle could be in a superposition of being **bound** and being **non-bound**. That is, it could have a superposition of energies, including energy levels below $E_B$ and energies above $E_B$. This is no problem. It will nevertheless be **easier** to study the two regimes **separately** at first, before combining them after, if required by the physical situation under consideration. 